import React, {useState, useEffect} from 'react';
import styles from './TripForm.module.css';
import LegacyAPI, {BartTime} from '../services/LegacyAPI';

const TripForm = ({removeForm, tripData})=>{
    const [stations, setStations] = useState(null);
    useEffect(()=>{
        const getStations = async ()=>{
            let res = await LegacyAPI.getStations();
            setStations(data => res);
        };
        getStations();
    }, []);

    const [formData, setFormData] = useState(tripData);

    const handleChange = (evt)=>{
        let name = evt.target.name;
        let value = evt.target.value;
        setFormData(data =>(
            {...data, [name]:value}
        ));
        console.log("formData:", formData);
    };

    const handleSubmit = (evt)=>{
        evt.preventDefault();

        // convert time to h:mm+am/pm
        // let t = BartTime.pickerToBart_time(formData.time);

        // convert date from yyyy-mm-dd to mm/dd/yyyy
        // let d = BartTime.pickerToBart_date(formData.date);
        removeForm({...formData});
    };
    const handleRadio = (evt) =>{
        let value = evt.target.value;
        setFormData(data=> ({...data, cmd: value}));
    };

    return (
        <div className={styles.planTrip}>
            <form className={styles.tripPlan_form}>
                {/* station A */}
                <label htmlFor="stnA" className={styles.tripPlan_a}>A</label>
                <select id="stnA" name="stnA" value={formData.stnA} onChange={handleChange}>
                    <option value=""> Enter starting point</option>
                    
                    {stations !== null && 
                        stations.map((e)=>(
                            <option key ={e.abbr} value={e.abbr}>{e.name}</option>
                        ))
                    }
                </select>

                {/* station B */}
                <label htmlFor="stnB" className={styles.tripPlan_b} >B</label>
                <select id="stnB" name="stnB" value={formData.stnB} onChange={handleChange}>
                    <option value=""> Enter destination point</option>
                    {stations !== null && 
                        stations.map((e)=>(
                            <option key ={e.abbr} value={e.abbr}>{e.name}</option>
                        ))
                    }
                </select>

                <div>
                    {/* input: depart / arrive */}
                    <input  type="radio" id="depart" name="cmd" value="depart" 
                    onChange={handleRadio} checked={formData.cmd === "depart"}
                    />
                    <label htmlFor="depart">Depart</label>

                    <input  type="radio" id="arrive" name="cmd" value="arrive" 
                    onChange={handleRadio} checked={formData.cmd === "arrive"}
                    />
                    <label htmlFor="arrive">Arrive</label>
                </div>

                {/* input: time */}
                <input type="time" id="time" name="time" 
                value={formData.time } onChange={handleChange}/>

                {/* input: date */}
                <input type="date"  id="date" name="date" value={formData.date} 
                max={BartTime.getDateFromNow(56)}
                min={BartTime.getDateFromNow(-10)}
                onChange={handleChange} />

                {/* submit button */}
                <button type="submit" onClick={handleSubmit}>Search</button>
            </form>
            
        </div>
    );
};

export default TripForm;