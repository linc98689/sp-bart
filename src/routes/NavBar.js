import React from 'react';
import {NavLink} from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import styles from './NavBar.module.css';

const NavBar = ()=>{
    return (
        <div className={styles.navBar_container}>
            <div><NavLink  to="/" className={({isActive})=>(isActive?styles.active:styles.navBar_item) 
        } ><i className={`${styles.icon} bi bi-train-front-fill` }></i>iBART</NavLink></div>
            <div><NavLink  to="/stations" className={({isActive})=>(isActive?styles.active:styles.navBar_item)} >STATIONS</NavLink></div>
            <div><NavLink  to="/plantrip" className={({isActive})=>(isActive?styles.active:styles.navBar_item)} >PLANNER</NavLink></div>

        </div>
    );
};

export default NavBar;