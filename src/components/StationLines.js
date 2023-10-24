import {useState, useEffect} from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

import styles from "./StationLines.module.css";
import LegacyAPI from "../services/LegacyAPI";
import LineSymbol from './LineSymbol';

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
                        <div className={styles.lines_item } key={e.routeID} >
                        <LineSymbol hexcolor={e[0].hexcolor} color={e[0].color} />
                        {e[0].origName} 
                        {e.length>1 && //shown if bi-direction
                            <i class="bi bi-arrows"></i>
                        }
                       {e.length === 1 &&  <i class="bi bi-arrow-right-short"></i>}
                       { e[0].destName}
                        
                       </div>
                    )
                    }
                )}
            </div> 
            }
        </div>
    );
}

export default StationLines;