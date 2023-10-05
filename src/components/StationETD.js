import {useState, useEffect} from "react";

import LegacyAPI from "../services/LegacyAPI";
import styles from "./StationETD.module.css";

const StationETD = ({id})=>{
    const [etd, setEtd] = useState(null);
    useEffect(()=>{
        const getTimes = async ()=>{
            try{
                let times = await LegacyAPI.getETD();
                setEtd(data => times);
            }
            catch(e){
                console.error(e);
            }
        };
        getTimes();
    }, []);

    return (
        <div className={styles.etd_container}>
            <div className={styles.etd_title}>
            Real Time Departures
            </div>

        </div>
    );
};

export default StationETD;
