import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

import LegacyAPI, {BartTime} from "../services/LegacyAPI";
import styles from "./StationETD.module.css";
import LineSymbol from "./LineSymbol";

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
                <div className={styles.etd_right}>Updated {BartTime.getCurrentTime()} PT</div>
            </div>
            {etd !== null && 
                <div className={styles.etd_list}>
                {etd.map((e)=>(
                    <div key={e.abbreviation}>
                      
                        {e.estimate.map((el)=>{
                            return (
                                <div className={styles.etd_dest_line}>
                                    <div className={styles.etd_dest_left}>
                                    <LineSymbol hexcolor={el[0].hexcolor} color={el[0].color}/>
                                    <div className={styles.etd_dest}>{el[0].dest} </div>
                                    </div>

                                    <div className={styles.etd_dest_times}>
                                        {el.map(elm=>(
                                            <div className={styles.etd_dest_item}>
                                            <span> {elm.minutes} </span>
                                            <i class="bi bi-train-freight-front"></i>
                                            </div>
                                        ))} 
                                        <span className={styles.etd_dest_unit}>min</span>
                                    </div>
                                </div>
                            );
                        })}
                       
                    </div>
               ))
                }
                </div>
            }
            {etd === null && 
            <div className={styles.etd_desc}>Real time departures are not available for the Real Time Departures Line.
                 Please use <Link to="/plantrip" className={styles.etd_link}>Trip Planner</Link></div>
            }

        </div>
    );
};

export default StationETD;
