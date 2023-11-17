import axios from 'axios';

class LegacyAPI{
    static BASE_URL ="https://api.bart.gov/api/";
    static BART_KEY = "MW9S-E7SL-26DU-VV8V";
    static WEEK_DAY = "10/19/2023";
    static SAT_DAY = "10/21/2023";
    static SUN_DAY = "10/22/2023";

    static async getStations(){
        let stations = LegacyAPI.loadFromLocalStorage("stations");
        if(stations === null){
            try{
                stations = await LegacyAPI.fetchStations();
            }
            catch(e){
                console.error(e);
            }
        }
        return stations;
    }  

    static async getStationsObj(){
        let stns = await LegacyAPI.getStations();
        console.log("stations: ", stns);
        let objStns = stns.reduce((obj, e)=>{
            obj[e.abbr] = e.name;
            return obj;
        }, {});
        return objStns;
    } 


    static async fetchStations(){
        console.log("loading stations...");
        let url = LegacyAPI.BASE_URL + "stn.aspx";
            try{
                let resp = await axios({
                    url:url,
                    method:"get",
                    params:{
                        cmd:"stns",
                        key:LegacyAPI.BART_KEY,
                        json:"y"
                    }
                });
                let stations = await resp.data.root.stations.station;
                LegacyAPI.saveToLocalStorage("stations", stations); // array of stations

                // save object of stations with abbr as key to localStorage
                let obj_stations = stations.reduce((ob, item)=>{
                    ob[item.abbr] = item.name;
                    return ob;
                }, {});
                LegacyAPI.saveToLocalStorage("stations-obj", obj_stations);

                return stations;
            }
            catch(e){
                console.error(e);
            }
    }

    
    static async getStationByAbbreviation(abb){ //abb: four-chracter abbreviation of requested station
        let stations = LegacyAPI.loadFromLocalStorage("stations-obj");
        if(stations === null){
            try{
                await LegacyAPI.fetchStations();
                stations = LegacyAPI.loadFromLocalStorage("stations-obj");
            }
            catch(e){
                console.error(e);
            }
        }
        let station = stations[abb];
        console.log("station: ", station);

        if(typeof(station)=== "string"){
            try{
                station = await LegacyAPI.fetchStationByAbbreviation(abb);
            }
            catch(e){
                console.error(e);
            }
        }
        return station;
    }

    static async fetchStationByAbbreviation(abb){
        console.log("loading station...");
        let url = LegacyAPI.BASE_URL + "stn.aspx";
        try{
            let resp = await axios({
                url:url,
                method:"get",
                params:{
                    cmd:"stninfo",
                    key:LegacyAPI.BART_KEY,
                    orig:abb,
                    json:"y"
                }
            });
            let station = resp.data.root.stations.station;
            let stns_obj = LegacyAPI.loadFromLocalStorage("stations-obj");
            stns_obj[station.abbr] = { ...station };
            LegacyAPI.saveToLocalStorage("stations-obj", stns_obj);

            return station;
        }
        catch(e){
            console.error(e);
        }

    }

    static async getRoutes(){
        let routes = LegacyAPI.loadFromLocalStorage("routes-obj");
        if(routes === null){
            try{
                routes = await LegacyAPI.fetchRoutes();
            }
            catch(e){
                console.error(e);
            }
        }
        return routes;
    }

    static async fetchRoutes(){
        let url = LegacyAPI.BASE_URL + "route.aspx";
        try{
            console.log("loading routes...");
            let res = await axios({
                url: url,
                method: 'get',
                params:{
                    cmd:"routeinfo",
                    key: LegacyAPI.BART_KEY,
                    route:"all",
                    date:LegacyAPI.WEEK_DAY, // weekdays
                    json:'y'
                }
            });
            let routes = res.data.root.routes.route; // array of routes, missing route-19
            // add route-19
            let res19 = await axios({
                url: url,
                method: 'get',
                params:{
                    cmd:"routeinfo",
                    key: LegacyAPI.BART_KEY,
                    route:"19",
                    date:LegacyAPI.WEEK_DAY, // weekdays
                    json:'y'
                }
            });
            routes.push(res19.data.root.routes.route);
            
            routes = routes.map(e=>{
                let idx = e.name.indexOf(" to ");
                let origName = e.name.substring(0, idx);
                let destName = e.name.substring(idx+4);
                return {...e, origName, destName};
            });
            LegacyAPI.saveToLocalStorage("routes", routes);

            // save as object with route-number as key
            let obj_routes = routes.reduce((obj, item)=>{
                obj[item.routeID] = {...item};
                return obj;
            }, {});
            LegacyAPI.saveToLocalStorage("routes-obj", obj_routes);

            return obj_routes;
        }
        catch(e){
            console.error(e);
        }
    }

    static saveToLocalStorage(key, obj){
        localStorage.setItem(key, JSON.stringify(obj));
    }

    static loadFromLocalStorage(key){
        return JSON.parse(localStorage.getItem(key));
    }

    static async getLinesByStation(id){
        try{
            let routes = await LegacyAPI.getRoutes();
            let station = await LegacyAPI.getStationByAbbreviation(id);
            let lines = [];
            if(station.north_routes.route)
                lines = [...station.north_routes.route];
            if(station.south_routes.route)
                lines = [...lines, ...station.south_routes.route];

            console.log("lines-0: ", lines);
            lines =  lines.map((elm)=> routes[elm]);
            console.log("lines-1: ", lines);
            lines = lines.reduce((obj, item)=>{
                obj[item.hexcolor] = 
                 obj[item.hexcolor] === undefined? [item] : [...obj[item.hexcolor], item];
                 return obj;
            }, {});

            return Object.values(lines); // array of lines combined by color
        }
        catch(e){
            console.error(e);
        }
        return ;
    }



    static async getETD(){// get estimated times of departure for all stations
        let url = LegacyAPI.BASE_URL + "etd.aspx";
        try{
            let res = await axios({
                url: url,
                method: "get",
                params:{
                    key: LegacyAPI.BART_KEY,
                    cmd: "etd",
                    orig: "ALL",
                    json: "y"
                },
            })
            console.log(res.data);
            let etd = res.data.root.station; // array of etd by station
            LegacyAPI.saveToLocalStorage("etd", etd);

            return etd;
        }
        catch(e){
            console.error(e);
        }
    }

    static async getETDbyStation(id){
        let etd = LegacyAPI.loadFromLocalStorage("etd");
        if(etd === null){
            try{
                etd = await LegacyAPI.getETD();
            }
            catch(e){
                console.error(e);
            }
        }
        return etd.filter((e)=>(e.abbr === id))[0].etd; // array of etd by destination of this stn
    }

    static async fetchETDbyStation(id){
        let url = LegacyAPI.BASE_URL + "etd.aspx";
        try{
            let res = await axios({
                url: url,
                method: "get",
                params:{
                    key: LegacyAPI.BART_KEY,
                    cmd: "etd",
                    orig: id,
                    json: "y"
                }
            });
            console.log(res.data.root.station[0].etd);
            let etd = res.data.root.station[0].etd;
            if (etd === undefined)
                return null;
            else{
                etd = etd.map(e =>{
                    let dest = e.destination;
                    let estimate = e.estimate.reduce((obj, item) => {
                        item.dest = dest;
                        obj[item.hexcolor]= 
                        obj[item.hexcolor] === undefined? [item] : [...obj[item.hexcolor], item];
                        return obj;
                    }, {});
                    estimate = Object.values(estimate);
                    console.log("combined time: ", {...e, estimate});
                    return {...e, estimate};
                });

                return etd;
            }
        }
        catch(e){
            console.log(e);
        }
    }

    static async fetchSchedByStn(id, date="now"){
        let url = LegacyAPI.BASE_URL + "sched.aspx";
        try{
            let res = await axios({
                url: url,
                method: "get",
                params:{
                    cmd: "stnsched",
                    key: LegacyAPI.BART_KEY,
                    date: date,
                    orig: id,
                    json: "y"
                }
            });
            console.log("schedule: ", res.data.root.station);
            return res.data.root.station;
        }
        catch(e){
            console.error(e);
        }
    }

    static async getSchedByStn(id){
        try{
            let sched = await LegacyAPI.fetchSchedByStn(id);
            let station = await LegacyAPI.getStationByAbbreviation(id);
            let routes = await LegacyAPI.getRoutes();

            
            // split items in schedule into north and south and stored as object
            let north = new Set(station.north_routes.route);

            let initObj = {north:{items:[], 
                                platforms: station.north_platforms.platform ===""? []: station.north_platforms.platform},
                           south:{items:[], 
                                platforms: station.south_platforms.platform ===""? []: station.south_platforms.platform},
                           name: station.name
                        };   

            sched = sched.item.reduce((obj, item)=>{
                let dest = item["@trainHeadStation"];
                let route = item["@line"];
                let hexcolor = routes[route].hexcolor;
                let color = routes[route].color;
                let time = item["@origTime"];
                let newItem = {time, hexcolor, color, dest};


                if(north.has(route)){
                    obj.north.items = [ ...obj.north.items, newItem ];
                }
                else{
                    obj.south.items =  [...obj.south.items, newItem ];
                }

                return obj;
            }, initObj);

            return sched;
        }
        catch(e){
            console.error(e);
        }
    }

    static async fetchTripSched(orig, dest , cmd="arrive", time="now", date="now"){
        let url = LegacyAPI.BASE_URL + "sched.aspx";
        try{
            let res = await axios({
                url,
                method:'get',
                params:{
                    cmd,orig, dest, time, date,
                    key: LegacyAPI.BART_KEY,
                    a:3,
                    b:3,
                    json:'y'
                }
            });
            console.log(res.data.root.schedule.request.trip);
            return res.data.root.schedule.request.trip;
        }
        catch(e){
            console.error(e);
        }
    }

}

class BartTime{
    static getCurrentDate(){ //yyyy-mm-dd
        let now =  new Date();
        return BartTime.bartToPicker_date(
            now.toLocaleDateString('en-US', {timeZone: 'America/Los_Angeles' }));
    }

    static getCurrentTime(){ // 9:42AM
        let now =  new Date();
        let str = now.toLocaleTimeString('en-US', {timeZone: 'America/Los_Angeles' });
        return BartTime.bartToPicker_time(
            str.replace(/:\d{2} /, "")); //omit seconds
    }

    static getDateFromNow(days){ // yyyy-mm-dd
        let event = new Date();
        event.setDate(event.getDate() + days);
        return BartTime.bartToPicker_date(
            event.toLocaleDateString('en-US', {timeZone: 'America/Los_Angeles'}));
    }

    static bartToPicker_time(timeStr){ // from hh:mm+am/pm to hh:mm
        let len = timeStr.length;
        let idx = timeStr.indexOf(":");
        let h = Number(timeStr.substring(0, idx));
        let min = timeStr.substring(idx+1, idx+3);
        if(min.length <2) min = "0"+min;

        let p = timeStr.substring(len-2).toLowerCase();

        if(p === "am"){
            if(h === 12)
                return "00:" + min;
            else{
                if (h<10)
                return  h.toString().length <2? "0"+h.toString() + ":" + min : 
                    h.toString() + ":" + min;
            }
        }
        else{
            if(h === 12)
                return h.toString() + ":" + min;
            else
                return (h+12).toString() + ":" + min;
        }
    }

    static bartToPicker_date(timeStr){ //from mm/dd/yyyy to yyyy-mm-dd
        let pos1 = timeStr.indexOf("/");
        let pos2 = timeStr.indexOf("/", pos1+1);
        let m = timeStr.substring(0, pos1);
        if(m.length <2) m = "0" + m;

        let d = timeStr.substring(pos1+1, pos2);
        if(d.length <2) d = "0" + d;
        let y = timeStr.substring(pos2+1);

        return y + "-" + m + "-" + d;
    }

    static pickerToBart_time(t){ // from hh:mm to hh:mm+am/pm
        let idx = t.indexOf(":");
        let h = Number(t.substring(0, idx));
        let min = t.substring(idx+1);
        if(h === 0)
            return ("12" + ":" + min + "am");
        else if (h === 12)
            return "12" + ":" + min + "pm";
        else if (h >12)
            return (h-12).toString() + ":" + min + "pm";
        else 
            return h.toString() + ":" + min + "am";
    }

    static pickerToBart_date(timeStr){ //from yyyy-mm-ddto  mm/dd/yyyy 
        let pos1 = timeStr.indexOf("-");
        let pos2 = timeStr.indexOf("-", pos1+1);
        let y = timeStr.substring(0, pos1);
        let m = timeStr.substring(pos1+1, pos2);
        let d = timeStr.substring(pos2+1);

        return m + "/" + d + "/" + y;
    }

    static pickerToDateString(dateStr){
        let d = dateStr.replace(/\//g, "-");
        let date = new Date(d);
        return date.toDateString();
    }

}

export default LegacyAPI;
export {BartTime};