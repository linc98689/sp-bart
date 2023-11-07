import React, {useState, useEffect} from 'react';
import styles from './StationSelector.module.css';
import LegacyAPI from '../services/LegacyAPI';
import 'bootstrap-icons/font/bootstrap-icons.css';


const StationSelector = ({funUpdate})=>{
    const MAX_RECENT = 5;
    const [stations, setStations] = useState(null);
    const [userStns, setUserStns] = useState([]);
    const [userFavorites, setUserFavorites] = useState([]);
    const [formData, setFormData] = useState({});
    const [recentSelect, setRecentSelect] = useState("");
    const [favoriteSelect, setFavoriteSelect] = useState("");

    useEffect(()=>{
        let stns = localStorage.getItem("user-stns");
        if(stns !== null)
            setUserStns(data => JSON.parse(stns));

        let fvts =localStorage.getItem("user-stns-favorites");
        if(fvts !== null)
            setUserFavorites(data => JSON.parse(fvts));

        const getStations = async ()=>{
            let res = await LegacyAPI.getStations();
            setStations(data=>res);

            return(()=>{
                localStorage.setItem("user-stns", JSON.stringify(userStns));
            })
        };
        getStations();
    }, []);

    const handleChange = (evt)=>{
        let name = evt.target.name;
        let value = evt.target.value;
        setFormData(data => ({...data, [name]:value}));
    };

    const handleSubmit = (evt)=>{
        evt.preventDefault();
        let stn = formData.stnAbbr;
        if(stn === "")
            return;

        // set currStn
        funUpdate(stn, getStationName(stn));

        // save userStns
        let sts = userStns.filter(e=> e.abbr !== stn);
        if(sts.length === userStns.length){// has no record
            // check if in userFavorites
            let newItem = {abbr:stn, isFavorite:false, selected: false}
            if(userFavorites.some(e => e.abbr === stn))
                newItem.isFavorite = true;

            sts.unshift(newItem);
            if (sts.length > MAX_RECENT)
                sts.pop();
        }
        else{ // has recorded
            let st = userStns.filter(e => e.abbr === stn)[0];
            sts.unshift(st);
        }
        
        setUserStns(data => sts);
        localStorage.setItem("user-stns", JSON.stringify(sts));

    };

    const handleFavorite = (evt)=>{
        let stn = evt.target.getAttribute("id").substring(0,4);
        let stns = [...userStns];
        stns.forEach(e=>{
            if(e.abbr === stn){
                let fvts = [...userFavorites];
                if(e.isFavorite){
                    e.isFavorite = false;
                    fvts = fvts.filter(el=>el.abbr !== e.abbr);//remove from favorites
                }
                else{
                    e.isFavorite = true;
                    fvts = [{...e, selected:false}, ...userFavorites]; // add to favorites
                }
                setUserFavorites(data => fvts);
                localStorage.setItem("user-stns-favorites", JSON.stringify( fvts));
            } 
        });
        setUserStns(data => stns);
        localStorage.setItem("user-stns", JSON.stringify(stns));
    };

    const handleDelete = (evt)=>{
        let stn = evt.target.getAttribute("id").substring(0, 4);
        //update userStns
        let stns = [...userStns];
        stns.forEach(e =>{
            if(e.abbr === stn)
                e.isFavorite = false;
        })
        setUserStns(data => stns);
        localStorage.setItem("user-stns", JSON.stringify(stns));

        //update userFavorites
        let fvts = [...userFavorites];
        fvts = fvts.filter(e => e.abbr !== stn);
        if(favoriteSelect === stn)
            setFavoriteSelect(data => "");
        setUserFavorites(data => fvts);
        localStorage.setItem("user-stns-favorites", JSON.stringify( fvts));
    };
    const handleRecentSelect = (evt)=>{
        let stn = evt.target.getAttribute("id").substring(0, 4);
        let stns = [...userStns];
        stns.forEach(e=>{
            if(e.abbr === stn){
                e.selected = true;
            }
            else{
                e.selected = false;
            }
        });
        setUserStns(data => stns);
        setRecentSelect(data => stn);
    }
    const handleFavoriteSelect = (evt)=>{
        let stn = evt.target.getAttribute("id").substring(0, 4);
        let stns = [...userFavorites];
        stns.forEach(e=>{
            if(e.abbr === stn){
                e.selected = true;
            }
            else{
                e.selected = false;
            }
        });
        setUserFavorites(data => stns);
        setFavoriteSelect(data => stn);
    };

    const handleCurrStationRecent = (evt)=>{
        if (recentSelect==="")
            return;
        funUpdate(recentSelect, getStationName(recentSelect));

        // update recent
        let stns = [...userStns];
        stns.forEach(e=>{
                e.selected = false;
        });

        let isFavorite = stns.filter(e=>e.abbr===recentSelect)[0].isFavorite;
        unshiftUserStn(recentSelect,isFavorite );
        setRecentSelect(data => "");

    }

    const handleCurrStationFavorite = (evt)=>{
        if (favoriteSelect==="")
            return;
        funUpdate(favoriteSelect, getStationName(favoriteSelect));

        // update favorite
        let stns = [...userFavorites];
        stns.forEach(e=>{
                e.selected = false;
        });
        setUserFavorites(data => stns);
        setFavoriteSelect(data => "");

        unshiftUserStn(favoriteSelect, true);

    }

    const getStationName = (abbr)=>{
        let stns = stations.filter(e=> e.abbr === abbr)
        if (stns.length === 0)
            return undefined;
        else
            return stns[0].name;
    };

    const unshiftUserStn = (stn, isFavorite)=>{
        // save userStns
        let sts = userStns.filter(e=> e.abbr !== stn);
        if(sts.length === userStns.length){// has no record
            let newItem = {abbr:stn, isFavorite, selected: false};
            sts.unshift(newItem);
            if (sts.length > MAX_RECENT)
                sts.pop();
        }
        else{ // has recorded
            let st = userStns.filter(e => e.abbr === stn)[0];
            sts.unshift(st);
        }
        
        setUserStns(data => sts);
        localStorage.setItem("user-stns", JSON.stringify(sts));
    }


    return (
        <>
        {stations !== null && 
        <div className={styles.selector_container}>
            <div className={styles.selector_title}>Choose a station:</div>
            {/* form */}
            <form className={styles.selector_form_container}>
                <div className={styles.selector_subtitle}>From a list of all stations:</div>
                <div className={styles.selector_form_input}>
                    <select id='stnAbbr' name='stnAbbr' value={formData["stnAbbr"]}
                className={styles.selector_select} onChange={handleChange}>
                        <option value="">Select a station</option>
                        {stations.map((e)=>
                        <option key={e.abbr} value={e.abbr} name={e.name}>{e.name}</option>)}
                    </select>
                </div>
                <div><button className={styles.selector_btn_choose} type='submit' onClick={handleSubmit}>GO</button></div>
            </form>

            {/* list - recent */}
            <div className={styles.selector_recent_container}>
                <div className={styles.selector_subtitle}>From stations visited recently:</div>
                <div className={styles.selector_list_container}>
                    {userStns.map(e=>
                        <div key={e.abbr} className={`${styles.selector_list_item} 
                        ${e.selected? styles.selector_stn_name_selected: styles.selector_stn_name}`}>
                            <span id={e.abbr+"-recent"} 
                            onClick={handleRecentSelect}>{getStationName(e.abbr)}</span>
                        <button className={styles.selector_btn_favorite} id={e.abbr+"-btn"} onClick={handleFavorite}>
                            {e.isFavorite? 
                            <i id={e.abbr+"-btn-icon"} class="bi bi-star-fill"></i>:
                            <i id={e.abbr+"-btn-icon-1"} class="bi bi-star"></i>}
                            </button>
                        </div>
                        )}
                </div>
                <button className={styles.selector_btn_choose} onClick={handleCurrStationRecent}>GO</button>
            </div>

            {/* list -favorites */}
            <div className={styles.selector_favorite_container}>
                <div className={styles.selector_subtitle}>From your favorite stations:</div>
                <div className={styles.selector_list_container}>
                {userFavorites.length > 0 && userFavorites.map(e=>
                   <div className={`${styles.selector_list_item} 
                    ${e.selected? styles.selector_stn_name_selected: styles.selector_stn_name}`}>
                        <span  id={e.abbr+"-favorite"}
                        onClick={handleFavoriteSelect}>{getStationName(e.abbr)}</span>
                        <button id={e.abbr+"-delete"} onClick={handleDelete}
                        className={styles.select_btn_delete}>
                             <i id={e.abbr+"-icon"} className="bi bi-trash"></i>
                            </button>
                       
                    </div> )}
                </div>   
                <div><button className={styles.selector_btn_choose} onClick={handleCurrStationFavorite}>GO</button></div>
                
            </div>

        </div>}
        </>
    );
}

export default StationSelector;