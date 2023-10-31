import React from "react";
import styles from "./StationSymbol.module.css";

const StationSymbol = ({color, char})=>{

    return (
        <div className={styles.station_symbol} style={{backgroundColor: color}} >
             <span className={styles.station_symbol_center} >
                {char}</span>
        </div>
    );
}

export default StationSymbol;