import styles from './StationIntro.module.css';

const StationIntro = ({id})=>{
    return (
        <div className={styles.stnIntro}>
            Station Intro: {id}
        </div>
    );
};

export default StationIntro;