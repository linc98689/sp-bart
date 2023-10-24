import React from "react";
import styles from "./LineSymbol.module.css";

const LineSymbol = ({hexcolor, color})=>{

    return (
        <div className={color === "BEIGE"? styles.lines_airplane: styles.lines_symbol} 
            style={color === "BEIGE"? {}: {backgroundColor:`${hexcolor}`}}> 
            {color === "BEIGE"? "":
             <span className={styles.lines_center} style={color === "YELLOW"? {}: {color: "white"}} >
                {color.charAt(0)}</span>}
        </div>
    );
}

export default LineSymbol;