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
            console.log(resp);
            return resp.data.root.stations.station;
        }
        catch(e){
            console.error(e);
        }
    }
}

export default LegacyAPI;