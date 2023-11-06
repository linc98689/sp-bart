import {useState} from 'react';
import StationSchedule from '../components/StationSchedules';
import styles from './Schedule.module.css';
import StationSelector from '../components/StationSelector';


const Schedule = ()=>{
    const [currStn, setCurrStn] = useState({abbr:"12TH", name:"12th St. Oakland City Center"});
    
    const funUpdate = (abbr, name)=>{
        setCurrStn(data =>({abbr, name}));
    }

    return (
        <>
            <div className={styles.schedule_title}>Station -  {currStn.name}</div>
            <div className={styles.schedule_container}>
                <div className={styles.schedule_selector}><StationSelector funUpdate={funUpdate } /></div>
                <div className={styles.schedule_result} >
                    <StationSchedule id={currStn.abbr}/> </div>
            </div>
        </>
    );
}

export default Schedule;