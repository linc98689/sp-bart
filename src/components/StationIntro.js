import {useState, useEffect} from 'react';

import  LegacyAPI from '../services/LegacyAPI';
import styles from './StationIntro.module.css';

const StationIntro = ({id})=>{
    const [stnInfo, setStnInfo] = useState(null);
    useEffect(()=>{
        const getStnInfo = async (id)=>{
            let res = await LegacyAPI.getStationByAbbreviation(id);
            console.log(res);
            setStnInfo(data =>res);}
        getStnInfo(id);

    }, [id]);
    return (
        <div className={styles.stnIntro}>
            {stnInfo !== null &&
            <>
                <div className={styles.stn_name}>{stnInfo.name}</div>
                <div className={styles.stn_address}>{`${stnInfo.address}, ${stnInfo.city}, ${stnInfo.state} ${stnInfo.zipcode}`}</div>
                <div className={styles.stn_desc}>{Object.values(stnInfo.intro)[0]}</div>
            </>
            }
        </div>
    );
};

export default StationIntro;