import React from 'react';
import {useParams, Navigate} from 'react-router-dom';
import styles from './Station.module.css';
import StationIntro from '../components/StationIntro';
import StationLines from "../components/StationLines";
import StationETD from "../components/StationETD";

const Station = ()=>{
    const {id} = useParams();
    return (
        <div className={styles.station}>
            <h1  className={styles.station_header}>Station {id}</h1>
            <StationIntro id={id} />
            <StationLines id={id} />
            <StationETD id={id} />
        </div>
    );
};

export default Station;