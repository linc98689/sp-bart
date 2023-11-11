import React from 'react';
import {useParams} from 'react-router-dom';
import styles from './Station.module.css';
import StationIntro from '../components/StationIntro';
import StationLines from "../components/StationLines";
import StationETD from "../components/StationETD";
import StationSchedules from '../components/StationSchedules';
import StationImg from "../components/StationImg";
import StepMenu from "../components/StepMenu";

import {findImgURLbyStation} from "../services/resource";

const Station = ()=>{
    const {id} = useParams();
    return (
        <div className={styles.station_menu_container} >
            <div className={styles.station_menu}>
                <StepMenu 
                terms={["home","stations",id]} 
                locations={["/", "/stations"]} />
            </div>
            <div  className={styles.station}>
                <div className={styles.station_single} ><StationIntro id={id} /></div>
                <div className={styles.station_single}><StationImg url={findImgURLbyStation(id)}  /></div>
                
            
                <div className={styles.station_single}><StationLines id={id} /></div>
                <div className={styles.station_single}><StationETD id={id} /></div>
                
                
                <div className={styles.station_double}><StationSchedules id={id} /></div>
            </div>
        </div>
        
    );
};

export default Station;