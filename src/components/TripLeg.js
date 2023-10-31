import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import styles from './TripLeg.module.css';

const TripLeg = ({orig, origTime, dest, destTime, route, routeColor})=>{
    return (
        <div className={styles.leg_container}>
            <div className={styles.leg_orig}>
                <div className={styles.leg_time}>{origTime}</div>
                <div className={styles.leg_stn}>{orig}</div>
            </div>
            <div className={styles.leg_route} >
                <div className={styles.leg_route_line} 
                style={{borderBottomColor: routeColor}}></div>
                <div className={styles.leg_route_num}><span className={styles.leg_route_heading}>
                <i className="bi bi-caret-right-fill"></i></span> {route}</div>
                <div className={styles.leg_route_line} 
                style={{borderBottomColor: routeColor}}></div>
            </div>
            <div className={styles.leg_dest}>
                <div className={styles.leg_time}>{destTime}</div>
                <div className={styles.leg_stn}>{dest}</div>
            </div>
        </div>
    );
};

export default TripLeg;