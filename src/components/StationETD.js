import {useState, useEffect} from "react";

import LegacyAPI from "../services/LegacyAPI";
import styles from "./StationETD.module.css";

const StationETD = ({id})=>{
    const [etd, setEtd] = useState(null);
    useEffect(()=>{
        const getTimes = async ()=>{
            try{
                let times = await LegacyAPI.fetchETDbyStation(id);
                setEtd(data => times);
            }
            catch(e){
                console.error(e);
            }
        };
        getTimes();
        let intervalID = setInterval(()=>{
            getTimes();
        }, 60000);

        return ()=>{
            clearInterval(intervalID);
        };

    }, [id]);

    return (
        <div className={styles.etd_container}>
            <div className={styles.etd_title}>
                <div className={styles.etd_left}>Real Time Departures </div>
                <div className={styles.etd_right}>Updated {new Date().toLocaleTimeString().replace(/:\d{2} /, " ")} </div>
            </div>
            {etd !== null && 
                <div className={styles.etd_list}>
                {etd.map((e)=>(
                    <div key={e.abbreviation}>
                        {e.destination }
                        {e.estimate.map((el)=>(
                            <div style={{"backgroundColor": el.hexcolor}}>{`${el.minutes} min` }</div>
                        ))}
                    </div>
                ))}
                </div>
            }

        </div>
    );
};

export default StationETD;
