import {useState, useEffect} from 'react';

import styles from "./StationLines.module.css";
import LegacyAPI from "../services/LegacyAPI";

const StationLines = ({id})=>{
    // console.log(LegacyAPI.getLinesByStation(id));
    const [lines, setLines] = useState(null);
    useEffect(()=>{
        const getLines = async (id)=>{
            let res = await LegacyAPI.getLinesByStation(id);
            console.log(res);
            setLines(data =>res);}
        getLines(id);

    }, [id]);


    return (
        <div className={styles.lines_container}>
            <div className={styles.lines_title}>
            Lines Serving this Station: {id}
            </div>
            {lines !== null && 
            <div className={styles.lines_list}>
                {lines.map(e=>{
                    return (
                        <div className={styles.lines_item} key={e.routeID} 
                        style={{backgroundColor:`${e.hexcolor}`}}>{e.name}</div>
                    )
                    }
                )}
            </div> 
            }
        </div>
    );
}

export default StationLines;