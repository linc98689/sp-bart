import React, {useState} from 'react';
import styles from './ETD.module.css';
import StationETD from '../components/StationETD';
import StationSelector from '../components/StationSelector';
import StepMenu from '../components/StepMenu';


const ETD = ()=>{
    const [currStn, setCurrStn] = useState({abbr:"12TH", name:"12th St. Oakland City Center"});
    
    const funUpdate = (abbr, name)=>{
        setCurrStn(data =>({abbr, name}));
    }

    return (
         <div className={styles.station_menu_container} >
            <div className={styles.station_menu}>
                <StepMenu 
                terms={["home","stations",`RTD - ${currStn.name}`]} 
                locations={["/", "/stations"]} />
            </div>
            <div className={styles.etd_title}>Station -  {currStn.name}</div>
            <div className={styles.etd_container}>
                <div className={styles.etd_selector}><StationSelector funUpdate={funUpdate } /></div>
                <div className={styles.etd_result} >
                
                    <StationETD id={currStn.abbr}/> </div>
            </div>
        </div>
    );
}

export default ETD;