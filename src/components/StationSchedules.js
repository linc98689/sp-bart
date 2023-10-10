import {useState, useEffect} from "react";

import LegacyAPI from "../services/LegacyAPI";
import styles from "./StationSchedules.module.css";

const StationSchedules = ({id})=>{
    const [sched, setSched] = useState(null);
    useEffect(()=>{
        const getSched = async ()=>{
            try{
                let res = await LegacyAPI.fetchSchedByStn(id);
                setSched(data => res);
            }
            catch(e){
                console.error(e);
            }
        };
        getSched();
    }, [id]);

    return (
        <div className={styles.sched_container}>
            <div className={styles.sched_title}>
            Station Schedule Results for {id}
            </div>
            {sched !== null && 
                <div  className={styles.sched_list}>
                    {sched.item.map((e)=>(
                        <div className={styles.sched_list_item}>
                            {`${e["@origTime"]} ${e["@trainHeadStation"]}      ${e["@line"]} `}
                        </div>
                    ))}
                </div>    
            }
        </div>
    );
};

export default StationSchedules;