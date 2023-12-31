import React, {useState, useEffect} from 'react';
import styles from './TripForm.module.css';
import LegacyAPI from '../services/LegacyAPI';
import StationSymbol from './StationSymbol';
import 'bootstrap-icons/font/bootstrap-icons.css';

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

        if(formData.stnA === "" || formData.stnB === "" 
         || formData.date === "" || formData.time === "")
            return;
        
        removeForm({...formData});
    };
    const handleRadio = (evt) =>{
        let value = evt.target.value;
        setFormData(data=> ({...data, cmd: value}));
    };
    const handleExchange = (evt)=>{
        let a = formData.stnA;
        let b = formData.stnB;
        console.log("a: ", a);
        console.log("b: ", b);
        setFormData(data =>{
            return {...data, "stnA":b,"stnB":a}});
    }

    return (
        <div className={styles.form_container}>
            <div className={styles.form_title}>Trip Planner</div>
            <form className={styles.form_inputs}>
                <div className={styles.form_top}>
                    <div className={styles.form_top_stns}>
                        {/* station A */}
                        <div className={styles.form_input}>
                            <StationSymbol color="#555555" char="A"/>
                            <div className={styles.form_select}>
                                <select required
                                id="stnA" name="stnA" value={formData.stnA} onChange={handleChange}  >
                                    <option value=""> Enter starting point ... </option>
                                    
                                    {stations !== null && 
                                        stations.map((e)=>(
                                            <option key ={e.abbr} value={e.abbr}>{e.name}</option>
                                        ))
                                    }
                                </select>
                                {formData.stnA === "" && <p className={styles.form_required}>required</p>}
                            </div>
                        </div>
                        {/* station B */}
                        <div className={styles.form_input}>
                            <StationSymbol color="#ee434d" char="B"/>  
                            <div className={styles.form_select}>
                                <select required 
                                id="stnB" name="stnB" value={formData.stnB} onChange={handleChange} >
                                    <option value=""> Enter destination point ...</option>
                                    {stations !== null && 
                                        stations.map((e)=>(
                                            <option key ={e.abbr} value={e.abbr}>{e.name}</option>
                                        ))
                                    }
                                </select>
                                {formData.stnB === "" && <p className={styles.form_required}>required</p>}
                            </div>
                        </div>
                    </div>
                    <div className={styles.form_top_exchange}>
                        <button type="button" className={styles.form_btn_exchange} onClick={handleExchange}><i className="bi bi-arrow-down-up"></i></button></div>
                </div>
                <div className={styles.form_time_date}>
                    {/* input: time */}
                    <div className={styles.form_input}>
                        <div className={styles.form_desc}>Time </div>
                        <input className={styles.form_time} type="time" id="time" name="time"
                            value={formData.time } onChange={handleChange}/>
                    </div>

                    {/* input: date */}
                    <div className={styles.form_input}>
                        <div className={styles.form_desc}>Date</div>
                        <input className={styles.form_date}
                        type="date"  id="date" name="date" value={`${formData.date}`}
                        max={`${formData.max}`}
                        min={`${formData.min}`}
                        onChange={handleChange} />
                    </div>
                </div>

                <div className={styles.form_input}>
                    {/* input: depart / arrive */}
                    <div className={styles.form_radio}>
                        <input  type="radio" id="depart" name="cmd" value="depart" 
                        onChange={handleRadio} checked={formData.cmd === "depart"}
                        />
                        <label htmlFor="depart">Depart</label>
                    </div>
                    
                    <div className={styles.form_radio}> 
                        <input  type="radio" id="arrive" name="cmd" value="arrive" 
                        onChange={handleRadio} checked={formData.cmd === "arrive"}
                        />
                        <label htmlFor="arrive">Arrive</label>
                    </div>
                </div>

                {/* submit button */}
                <button className={styles.form_submit} type="submit" onClick={handleSubmit}>Search</button>
            </form>
            
        </div>
    );
};

export default TripForm;