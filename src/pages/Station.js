import React from 'react';
import {useParams} from 'react-router-dom';
import styles from './Station.module.css';
import StationIntro from '../components/StationIntro';
import StationLines from "../components/StationLines";
import StationETD from "../components/StationETD";
import StationSchedules from '../components/StationSchedules';

const Station = ()=>{
    const {id} = useParams();
    return (
        <div className={styles.station}>
            <h1  className={styles.station_header}>Station {id}</h1>
            <StationIntro id={id} />
            <StationLines id={id} />
            <StationETD id={id} />
            <StationSchedules id={id} />
        </div>
    );
};

export default Station;