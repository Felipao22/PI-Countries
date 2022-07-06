import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getCountries, postActivity} from "../../redux/actions";
import styles from './Activity.module.css'

function validate(input) {
    let errors= {};
    if(!input.name) {
        errors.name = 'Se requiere un nombre'
    } else if(!input.dificultad) {
        errors.dificultad = 'Se requiere una dificultad'
    } else if(input.dificultad > 5 || input.dificultad < 1) {
        errors.dificultad = 'Se requiere una dificultad entre 1 y 5'
    }else if(!input.duracion) {
        errors.duracion = 'Se requiere una duración'
    }else if(input.duracion > 24) {
        errors.duracion = 'Se requiere una duración hasta 24 hs.'
    } else if(!input.temporada) {
        errors.temporada = 'Se requiere una temporada'
    }
    return errors;    
}

export default function ActivityCreated() {
    const dispatch = useDispatch();
    let countries = useSelector((state) => state.allCountries);
    countries = countries.sort((a, b) => {
        if(a.name > b.name) return  1;
        if(b.name > a.name) return -1;
        return 0;
    })
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: '',
        dificultad: '',
        duracion: '',
        temporada: '',
        countries: []
    })

    useEffect(()  => {
        dispatch(getCountries())
    },[dispatch])

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
        e.preventDefault();
        if(!input.countries.includes(e.target.value) && e.target.value !== 'country')
        setInput({
            ...input,
            countries: [...input.countries, e.target.value]
        })
    }

    function handleCheck(e) {
        if(e.target.checked){
            setInput({
                ...input,
                temporada: e.target.value
            })
        }
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

    function handleDelete(e) {
        setInput({
            ...input,
            countries: input.countries.filter(c=> c !== e  )
        })
    }



    return(
        <div>

            {
                countries.length > 0 ?
                <div>

                <h1>Creá la actividad</h1>
                <form className={styles.container} onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Actividad:</label>
                    <input  className={errors.name && styles.danger} type="text" value= {input.name} name="name"
                    onChange={(e) => handleChange(e)}
                    required/>
                    <br/>
                    {errors.name && (
                        <p className={styles.danger}>{errors.name} </p>
                    )}
                </div>
                <div>
                    <label>Dificultad:</label>
                    <input type="text" value= {input.dificultad} name='dificultad'
                    onChange={(e) => handleChange(e)}
                    max={5}
                    min={1}
                    required/>
                    <br/>
                    {errors.dificultad && (
                        <p className="error">{errors.dificultad} </p>
                        )}
                </div>
                <div>
                    <label>Duración:</label>
                    <input type="text" value= {input.duracion} name='duracion'
                    onChange={(e) => handleChange(e)}
                    max='24'
                    min='0'
                    required/>
                    <br/>
                    {errors.duracion && (
                        <p className="error">{errors.duracion} </p>
                        )}
                </div>
                    <label className={styles.temporada}>Temporada:</label>
                <div className={styles.check}>
                    <br />
                    <label >Verano</label>
                    <input type="radio" id='Verano' value='Verano' name='temporada'
                    onClick={(e) => handleCheck(e)}
                    defaultChecked
                    required/>                    
                    
                    <label >Primavera</label>
                    <input type="radio" id='Primavera' value='Primavera' name='temporada'
                    onClick={(e) => handleCheck(e)}
                    required/>
                    
                    <label >Otoño</label>
                    <input type="radio" id='Otoño' value='Otoño' name='temporada'
                    onClick={(e) => handleCheck(e)}
                    required/>
               
                    
                    <label >Invierno</label>
                    <input type="radio" id='Invierno' value='Invierno' name='temporada'
                    onClick={(e) => handleCheck(e)}
                    required/>
                    
                    
                    {errors.temporada && (
                        <p className="error">{errors.temporada} </p>
                        )}
                </div>
                <select onChange ={e=>handleSelect(e)} defaultValue='country'>
                    <option value ='country'> Seleccione Pais</option>
                {countries.map((a)=>(
                    <option key={a.name} value={a.name}>{a.name}</option>
                    ) )}
                
                </select>
                <div className={styles.delete}>
                <p  className={styles.country}>{input.countries.map(e => e + ', ')}</p>
                {input.countries.map(e => 
                <p onClick={() => handleDelete(e)}><button className={styles.x}>X</button>                        
                    </p>
                    )}
                </div>
                <button type='submit'>Crear Actividad</button>
            </form>
            <Link to = '/home'> <button>Volver</button></Link>
                    </div>
            : <div><option>Loading</option></div>
        }
    
        </div>


        )
}
