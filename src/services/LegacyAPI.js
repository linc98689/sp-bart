import axios from 'axios';

class LegacyAPI{
    static BASE_URL ="https://api.bart.gov/api/";
    static BART_KEY = "MW9S-E7SL-26DU-VV8V";

    static async getStations(){
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
            return resp.data.root.stations.station;
        }
        catch(e){
            console.error(e);
        }
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
}

export default LegacyAPI;