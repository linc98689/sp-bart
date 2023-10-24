import {useState, useEffect} from "react";

import LegacyAPI from "../services/LegacyAPI";
import styles from "./StationSchedules.module.css";
import LineSymbol from "./LineSymbol";

const StationSchedules = ({id})=>{
    const [sched, setSched] = useState(null);
    useEffect(()=>{
        const getSched = async ()=>{
            try{
                let res = await LegacyAPI.getSchedByStn(id);
                setSched(data => res);
            }
            catch(e){
                console.error(e);
            }
        };
        getSched();
    }, [id]);

    return (
        <>
            { sched !== null &&
                <div className={styles.sched_container}>
                    <div className={styles.sched_title}>
                    Station Schedule Results for {sched.name}
                    </div>
                    <div className={styles.sched_list_container}>
                        <div  className={styles.sched_side_container}> 
                            <p className={styles.sched_subtitle}>Northbound Platform {sched.north.platforms.map(e=> <span>{e + " "}</span>)}</p>
                            <div className={styles.sched_items}>
                                {sched.north.items.map(e=>(
                                    <div className={styles.sched_item}>
                                        <div>{e.time}</div>
                                       <LineSymbol hexcolor={e.hexcolor} color={e.color}/>
                                       <div>{e.dest}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div  className={styles.sched_side_container}> 
                            <p className={styles.sched_subtitle}>Southbound Platform {sched.south.platforms.map(e=> <span>{e + " "}</span>)}</p>
                            <div className={styles.sched_items}>
                                {sched.south.items.map(e=>(
                                    <div className={styles.sched_item}>
                                        <div>{e.time}</div>
                                       <LineSymbol hexcolor={e.hexcolor} color={e.color}/>
                                       <div>{e.dest}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                    </div>
                
                </div>}
        </>
    );
};

export default StationSchedules;