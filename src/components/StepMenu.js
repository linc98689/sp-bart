import React from 'react';
import {Link} from 'react-router-dom'
import styles from './StepMenu.module.css';

const StepMenu = ({terms, locations})=>{
    return (
        <>
            {terms.length >0 && 
            <div className={styles.stepMenu_container}>
                {terms.slice(0, -1).map((e,i)=>
                (<>
                    <div className={styles.stepMenu_link_item}><Link to={`${locations.slice(i, i+1)}`}>{e}</Link></div>
                    <div>|</div>
                </>)
                )}
                <div className={styles.stepMenu_nonlink_item}>{terms.slice(-1)}</div>
            </div>
            } 
        </>
        );
    };

export default StepMenu;