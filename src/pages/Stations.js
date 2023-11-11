import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import StepMenu from '../components/StepMenu';

import LegacyAPI from '../services/LegacyAPI';
import styles from './Stations.module.css';

const Stations = ()=>{
    const [stations, setStations] = useState([]);
    useEffect(
        ()=>{
            const getStations = async ()=>{
                let res = await LegacyAPI.getStations();
                setStations(data=>res);
            };
            getStations();
        }, []);

    return (
        <div className={styles.station_menu_container} >
            <div className={styles.station_menu}>
                <StepMenu 
                terms={["home","stations"]} 
                locations={["/"]} />
            </div>
            <div className={styles.stations}>
                <div className={styles.stations_header}>
                    Stations
                </div>
                <p className={styles.stations_desc}>For detailed station information—including Real Time Departures, Schedules, Parking, Connecting Transit, and Station Updates—select your station from the following list:</p>
                {stations.length !==0 && 
                    <div className={styles.stations_list_container}>
                        {stations.map(e=> (
                        <div key={e.abbr} className={styles.stations_list_item}>
                            <Link to={`/station/${e.abbr}`}>{e.name}</Link>
                        </div>))}
                    </div>
                }

            </div>
        </div>
    );
};

export default Stations;