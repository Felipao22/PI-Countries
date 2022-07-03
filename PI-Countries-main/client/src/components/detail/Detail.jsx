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
            dispatch(setDetail)
        }
    },[dispatch, id])  

    return(

        <div>
            {
            countries.length > 0 ?
            <div className={styles.container} key={id}>
                <img src={countries[0].flags} alt="Bandera de país no encontrada" />
                <h1>{countries[0].name}</h1>
                <h2>{countries[0].continents? countries[0].continents: 'No tiene continente'}</h2>
                <h3>{countries[0].id? countries[0].id:'No tiene id' }</h3>
                <h4>Capital: {countries[0].capital? countries[0].capital: 'No tiene capital'}</h4>
                <h4>Continente: {countries[0].subregion?countries[0].subregion : 'No tiene SubRegion'}</h4>
                <h4>Área: {countries[0].area? countries[0].area : 0}Km2</h4>
                <h4>Población: {countries[0].population} Hab.</h4>
                <h4 className={styles.actividades}>Actividades: {countries[0].activities?
                countries[0].activities.map(e => `Nombre: ${e.name}, Dificultad: ${e.dificultad}, Duración: ${e.duracion} minutos, Temporada: ${e.temporada}.`) : 'No hay actividades.'}</h4>
                    <Link to='/home'>
                        <button>Volver</button>
                    </Link>
            </div> : <h2>Loading...</h2> 
            }
        </div>
    )


} 