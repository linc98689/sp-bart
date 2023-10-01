import React from 'react';
import styles from './Home.module.css';
import LegacyAPI from '../services/LegacyAPI';

const Home =  ()=>{
    console.log(LegacyAPI.getStations());
    // console.log(LegacyAPI.getStationByAbbreviation("balb"));
    return (
        <div className={styles.home}>
            <h1 className={styles.home_header}>
                Home
            </h1>
        </div>
    );
};

export default Home;