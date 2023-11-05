import React from "react";
import {Link} from "react-router-dom";
import TripLeg from "./TripLeg";
import styles from "./Trip.module.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

const Trip = ({trip, routes, stations})=>{ // for one trip
    return (
        <>
            {trip !== null && 
             <div className={styles.trip_container}>
                <div className={styles.trip_summary}>
                    <div className={styles.trip_duration}>
                        <span className={styles.trip_icon}><i class="bi bi-clock"></i></span>{trip["@tripTime"]} min</div>
                    <div className={styles.trip_fare}> 
                    <span className={styles.trip_icon}><i class="bi bi-cash-stack"></i></span>${trip["@fare"]}</div>
                </div>
                <div className={styles.trip_leg_container}>
                    {trip.leg.length === 1? 
                    <TripLeg orig={trip.leg[0]["@origin"]} 
                    origTime={trip.leg[0]["@origTimeMin"]}
                    dest={trip.leg[0]["@destination"]}
                    destTime={trip.leg[0]["@destTimeMin"]}
                    route={trip.leg[0]["@trainHeadStation"]}
                    routeColor={routes[trip.leg[0]["@line"]]} />
                    :
                    <div className={styles.trip_leg_list}>
                    {trip.leg.map((e,i)=>(
                        <div className={styles.trip_leg}>
                            {i!== trip.leg.length-1 && <div className={styles.trip_dest}>
                                Transfer at <span className={styles.link}>
                                    <Link to={`/station/${e["@destination"]}` }   target="_blank"> {stations[e["@destination"]]} </Link></span>
                                ({e["@destination"]})
                            </div>}
                            <TripLeg 
                            orig={e["@origin"]} 
                            origTime={e["@origTimeMin"]}
                            dest={e["@destination"]}
                            destTime={e["@destTimeMin"]}
                            route={e["@trainHeadStation"]}
                            routeColor={routes[e["@line"]].color} 
                            />
                        </div>
                    ))}
                    </div>
                     }
                </div>
             </div>
            }

        </>
    );
};

export default Trip;