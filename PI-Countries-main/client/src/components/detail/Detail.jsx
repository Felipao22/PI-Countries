import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, setDetail } from "../../redux/actions/index";
import { useEffect } from "react";
import styles from './Detail.module.css'


export default function Detail(){
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countryDetail);

    const { id } = useParams();
    useEffect(() => {   
        dispatch(getDetail(id))
        return () => { 
            dispatch(setDetail())
        }
    },[dispatch, id])  

    return(

        <div>
            {
            countries.length > 0 ?
            <div className={styles.container} key={id}>
                <img src={countries[0].flags} alt="Country flag not found" />
                <h1>{countries[0].name}</h1>
                <h2>{countries[0].continents? countries[0].continents: 'Has no continent'}</h2>
                <h3>{countries[0].id? countries[0].id:'Has no id' }</h3>
                <h4>Capital: {countries[0].capital? countries[0].capital: 'Has no capital'}</h4>
                <h4>Subregion: {countries[0].subregion?countries[0].subregion : 'Has no Subregion'}</h4>
                <h4>Area: {countries[0].area? countries[0].area : 0}Km2</h4>
                <h4>Population: {countries[0].population} Hab.</h4>
                <h4 className={styles.actividades}>Activities: {countries[0].activities?
                countries[0].activities.map(e => ` Name: ${e.name}, Dificulty: ${e.dificulty}, Duration: ${e.duration}hrs, Season: ${e.season}.`) : 'No activities.'}</h4>
                    <Link to='/home'>
                        <button>Volver</button>
                    </Link>
            </div> :
            <svg viewBox="25 25 50 50">
            <circle r="20" cy="50" cx="50"></circle>
          </svg>
            // <div className={styles.chaotic-orbit}></div>
            //  <h2 className={styles.loading}></h2> 
            }
        </div>
    )


} 