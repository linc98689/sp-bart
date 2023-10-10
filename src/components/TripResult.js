import React, {useState, useEffect} from 'react';
import styles from './TripResult.module.css';
import LegacyAPI, {BartTime} from '../services/LegacyAPI';

const TripResult = ({tripData, setForm})=>{
    const [trips, setTrips] = useState(null);

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

    const handleClick = (evt) =>{
        setForm();
    };

    return (
        <div className={styles.tripResult}>
            <h1 className={styles.tripResult_header}>
                Trip Result
            </h1>
            <p>Starting point: {tripData.stnA}</p>
            <p>Destination point: {tripData.stnB}</p>
            <button className={styles.tripResult_back} onClick={handleClick}> back </button>
             { trips !== null &&
              <>
                {trips.map((e)=>(
                    <>
                        <div> origTimeMin: {e["@origTimeMin"]}  </div>
                        <div> destTimeMin: {e["@destTimeMin"]}  </div>
                        <div> tripTimeMin: {e["@tripTime"]}  </div>
                        {e.leg.map((el)=>(
                            <>
                                <div> leg-order: {el["@order"]}</div>
                                <div> origTimeMin: {el["@origTimeMin"]}  </div>
                                <div> destTimeMin: {el["@destTimeMin"]}  </div>
                                <div> origin: {el["@origin"]}  </div>
                                <div> destination: {el["@destination"]}  </div>
                                <div> line: {el["@line"]}  </div>
                                <div> trainHeadStation: {el["@trainHeadStation"]}  </div>
                            </>
                        ))}
                        <br/>
                    </>
                ))}
              </>}

        </div>
    );

};

export default TripResult;