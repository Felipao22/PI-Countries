import React, {useState} from "react";
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { postActivity} from "../../redux/actions";
import styles from './Activity.module.css'

function validate(input) {
    let errors= {};
    if(!input.name) {
        errors.name = 'Se requiere un nombre'
    } else if(!input.dificultad) {
        errors.dificultad = 'Se requiere una dificultad'
    } else if(!input.duracion) {
        errors.duracion = 'Se requiere una duración'
    } else if(!input.temporada) {
        errors.temporada = 'Se requiere una temporada'
    }
    return errors;    
}

export default function ActivityCreated() {
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries);
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: '',
        dificultad: '',
        duracion: '',
        temporada: '',
        countries: []
    })

    function handleChange(e){
        setInput({
            ...input,
           [e.target.name]: e.target.value
        })
        setErrors(validate( {
            ...input,
            [e.target.name]: e.target.value
        }));
    }
    

    function handleSelect(e){
        setInput({
            ...input,
            countries: [...input.countries, e.target.value]
        })
    }
    function handleSubmit(e){
        e.preventDefault();
        dispatch(postActivity(input));
        alert("Activity created successfully")
        setInput({
            name: "",
            dificultad: "",
            duracion: "",
            temporada: "",
            countries: []
        })
    }


    return(
        <div>
            <Link to = '/home'> <button>Volver</button></Link>
            <h1>Creá la actividad</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Actividad:</label>
                    <input className={errors.name && styles.danger} type="text" value= {input.name} name="name"
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.name && (
                        <p className={styles.danger}>{errors.name} </p>
                    )}
                </div>
                <div>
                    <label>Dificultad:</label>
                    <input type="text" value= {input.dificultad} name='dificultad'
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.dificultad && (
                        <p className="error">{errors.dificultad} </p>
                    )}
                </div>
                <div>
                    <label>Duración:</label>
                    <input type="text" value= {input.duracion} name='duracion'
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.duracion && (
                        <p className="error">{errors.duracion} </p>
                    )}
                </div>
                <div>
                    <label>Temporada:</label>
                    <input type="text" value= {input.temporada} name='temporada'
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.temporada && (
                        <p className="error">{errors.temporada} </p>
                    )}
                </div>
                <select onChange ={e=>handleSelect(e)}>
                    <option value ='country'> Seleccione Pais</option>
                    {/* <button onClick={() => dispatch(deleteCountry(props.id))}>x</button> */}
                {countries.map((a)=>(
                     <option value={a.name}>{a.name}</option>
                 ) )}
                
                </select>
                <div>{input.countries.map(e => e + ' ,')}</div>
                <button type='submit'>Crear Actividad</button>
            </form>
        </div>
    )
}