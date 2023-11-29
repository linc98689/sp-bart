import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import styles from './Home.module.css';

import LegacyAPI from '../services/LegacyAPI';
import img from "../images/bartStation.jpg";
const Home =  ()=>{
    useEffect(()=>{
        const getStnsObj = async ()=>{
            try{
                 await LegacyAPI.getStations();
            }
            catch(e){
                console.error(e);
            }
        };
        getStnsObj();
    }, []);

    return (
        <div className={styles.home} style={{backgroundImage:`url("${img}")`}}>
            <Link to="/plantrip" className={styles.card }>
                <div className={`${styles.title} ${styles.color1}`}>Trip Planner</div>
                <div className={`${styles.content} ${styles.color1}`}><i className="bi bi-geo-alt"></i></div>
            </Link>

            <Link to="/realtime" className={styles.card}>
                <div className={`${styles.title} ${styles.color2}`}>Real Time Departures</div>
                <div className={`${styles.content} ${styles.color2}`}><i className="bi bi-clock"></i></div>
            </Link>

            <Link to="/schedule"  className={styles.card}>
                <div className={`${styles.title} ${styles.color3}`}>Schedules</div>
                <div className={`${styles.content} ${styles.color3}`}><i className="bi bi-map"></i></div>
            </Link>
        </div>
    );
};

export default Home;