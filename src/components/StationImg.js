import React from "react";
import styles from "./StationImg.module.css"

const StationImg = ({url})=>{
    return (
        <div className={styles.img_container} 
        style={{backgroundImage: `url(${url})`}}>
        </div>
    );
};

export default StationImg;