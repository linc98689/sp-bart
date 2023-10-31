import React, {useState} from 'react';
import styles from './PlanTrip.module.css';
import TripForm from "../components/TripForm";
import TripResult from "../components/TripResult";
import { BartTime } from '../services/LegacyAPI';

import img from "../images/bartMap.jpg";

const PlanTrip = ()=>{
    const [tripData, setTripData] = useState({
        stnA:"", 
        stnB:"", 
        cmd:"arrive",
        time: BartTime.bartToPicker_time(BartTime.getCurrentTime()),
        date: BartTime.bartToPicker_date(BartTime.getCurrentDate())  });
    const [hasResult, setHasResult] = useState(false);

    const removeForm = (formData)=>{
        setTripData(data=>({...data, ...formData}));
        setHasResult(data=> true);
    };

    const setForm = ()=>{
        setHasResult(data=> false);
    }

    return (
        <div className={styles.planTrip_container}>
            <div className={styles.planTrip_search_form}>
                {hasResult? 
                <TripResult setForm={setForm} tripData={tripData} /> :
                <TripForm removeForm={removeForm} tripData={tripData}/>}  
            </div>
            
            <div className={styles.planTrip_map} >
                <img src={`${img}`} alt="bart-map"/>
            </div>
        </div>
    );
};

export default PlanTrip;