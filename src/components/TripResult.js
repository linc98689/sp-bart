import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import styles from './TripResult.module.css';
import LegacyAPI, {BartTime} from '../services/LegacyAPI';
import Trip from './Trip';
import TripLeg from './TripLeg';
import 'bootstrap-icons/font/bootstrap-icons.css';

const TripResult = ({tripData, setForm})=>{
    const [trips, setTrips] = useState(null);
    const [stations, setStations] = useState(null);
    const [routes, setRoutes] = useState(null);

    useEffect(()=>{
        const getTrips = async ()=>{

            let res = await LegacyAPI.fetchTripSched(tripData.stnA, tripData.stnB, 
                tripData.cmd, 
                BartTime.pickerToBart_time(tripData.time ),
                BartTime.pickerToBart_date(tripData.date)
                );

            setTrips (data => res);
        }
        getTrips();
            
    }, [tripData]);

    useEffect(()=>{
        const getStations = async ()=>{
            let stns = await LegacyAPI.getStationsObj();
            setStations(data => ({...stns}));
        };
        getStations();
    }, []);

    useEffect(()=>{
        const getRoutes = async ()=>{
            let rts = await LegacyAPI.getRoutes();
            setRoutes(data => ({...rts}));
        };
        getRoutes();
    }, []);


    const handleClick = (evt) =>{
        setForm();
    };

    return (<>
        { stations !== null && routes !== null &&
            <div className={styles.tripResult_container}>
            <div className={styles.tripResult_title}>
            <button className={styles.tripResult_back} onClick={handleClick}> 
            <i className="bi bi-arrow-left"></i> </button>
            Results
            </div>
            <div className={styles.tripResult_details_container}>
            <p className={styles.tripResult_desc}>Origin: 
            <Link to={`/station/${tripData.stnA}`} className={styles.link} target="_blank"> {stations[tripData.stnA]}</Link>
            <span className={styles.abbr}>({tripData.stnA})</span></p>
            <p className={styles.tripResult_desc}>Destination: 
            <Link to={`/station/${tripData.stnB}`} className={styles.link}> {stations[tripData.stnB]}</Link>
            <span className={styles.abbr}>({tripData.stnB})</span></p>
            <p className={styles.tripResult_date}>{BartTime.pickerToDateString(tripData.date)}</p>
             { trips !== null &&
              <>
                {trips.map((e)=>(
                    <div className={styles.tripResult_trip}>
                    <Trip  routes={routes} stations={stations} trip={e} />
                    <hr></hr>
                    </div>
                ))}
              </>}
            </div>
        </div>
        } 
    </>);

};

export default TripResult;