import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = ()=>{
    return (
        <div className={styles.navBar_container}>
            <div><NavLink  to="/" className={({isActive})=>(isActive?styles.active:styles.navBar_item)} >🚎BART-react</NavLink></div>
            <div><NavLink  to="/stations" className={({isActive})=>(isActive?styles.active:styles.navBar_item)} >Stations</NavLink></div>
            <div><NavLink  to="/plantrip" className={({isActive})=>(isActive?styles.active:styles.navBar_item)} >Plan Trip</NavLink></div>

        </div>
    );
};

export default NavBar;