import React from 'react';
import {useParams, Navigate} from 'react-router-dom';
import styles from './Station.module.css';
import StationIntro from '../components/StationIntro';

const Station = ()=>{
    const {id} = useParams();
    return (
        <div className={styles.station}>
            <h1  className={styles.station_header}>Station</h1>
            <StationIntro id={id}/>
        </div>
    );
};

export default Station;