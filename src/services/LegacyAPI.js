import axios from 'axios';

class LegacyAPI{
    static BASE_URL ="https://api.bart.gov/api/";
    static BART_KEY = "MW9S-E7SL-26DU-VV8V";

    static async getStations(){
        let stations = LegacyAPI.loadFromLocalStorage("stations");
        if(stations === null){
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
                stations = resp.data.root.stations.station;
                LegacyAPI.saveToLocalStorage("stations", stations);
            }
            catch(e){
                console.error(e);
            }
        }
        return stations;
        
    }  

    static async getStationByAbbreviation(abb){ //abb: four-chracter abbreviation of requested station
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
            return resp.data.root.stations.station;
        }
        catch(e){
            console.error(e);
        }
    }

    static async getRoutes(){
        let url = LegacyAPI.BASE_URL + "route.aspx";
        try{
            let res = await axios({
                url: url,
                method: 'get',
                params:{
                    cmd:"routeinfo",
                    key: LegacyAPI.BART_KEY,
                    route:"all",
                    date:"10/02/2020",
                    json:'y'
                }
            });
            let routes = res.data.root.routes.route; // array of routes
            LegacyAPI.saveToLocalStorage("routes", routes);
            return routes;
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
        let routes = LegacyAPI.loadFromLocalStorage("routes");
        if(routes === null) {
            routes = await LegacyAPI.getRoutes();
            console.log("fetched routes: ", routes);
        }
        let lines = routes.filter(e=>{
            let stns = new Set(e.config.station);
            return stns.has(id);
        });
        return lines;
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
            return res.data.root.station[0].etd;
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

    static async fetchTripSched(orig, dest , cmd="arrive", time="now", date="now"){
        let url = LegacyAPI.BASE_URL + "sched.aspx";
        try{
            let res = await axios({
                url,
                method:'get',
                params:{
                    cmd,orig, dest, time, date,
                    key: LegacyAPI.BART_KEY,
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
    static getCurrentDate(){ // mm/dd/yyyy
        let now =  new Date();
        return now.toLocaleDateString('en-US', {timeZone: 'America/Los_Angeles' });
    }

    static getCurrentTime(){ // 9:42AM
        let now =  new Date();
        let str = now.toLocaleTimeString('en-US', {timeZone: 'America/Los_Angeles' });
        return str.replace(/:\d{2} /, ""); //omit seconds
    }

    static getDateFromNow(days){ // mm/dd/yyyy
        let event = new Date();
        event.setDate(event.getDate() + days);
        return event.toLocaleDateString('en-US', {timeZone: 'America/Los_Angeles'})
    }

    static bartToPicker_time(timeStr){ // from hh:mm+am/pm to hh:mm
        let len = timeStr.length;
        let idx = timeStr.indexOf(":");
        let h = Number(timeStr.substring(0, idx));
        let min = timeStr.substring(idx+1, idx+3);
        let p = timeStr.substring(len-2).toLowerCase();

        if(p === "am"){
            if(h === 12)
                return "00:" + min;
            else
                return h.toString() + ":" + min;
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
        let d = timeStr.substring(pos1+1, pos2);
        let y = timeStr.substring(pos2+1);

        return y + "-" + m + "-" + d;
    }

    static pickerToBart_time(t){ // from hh:mm to hh:mm+am/pm
        let idx = t.indexOf(":");
        let h = Number(t.substring(0, idx));
        let min = t.substring(idx+1);
        if(h === 0)
            return "12" + ":" + min + "am";
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

}

export default LegacyAPI;
export {BartTime};