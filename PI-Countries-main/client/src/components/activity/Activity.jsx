import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getCountries, postActivity} from "../../redux/actions";
import styles from './Activity.module.css'

function validate(input) {
    let errors= {};
    if(!input.name) {
        errors.name = 'A name is required'
    } else if(!input.difficulty) {
        errors.difficulty = 'A difficulty is required'
    } else if(input.difficulty > 5 || input.difficulty < 1) {
        errors.difficulty = 'A difficulty between 1 and 5 is required'
    }else if(!input.duration) {
        errors.duration = 'A duration is required'
    }else if(input.duration > 24) {
        errors.duration = 'A duration of up to 24 hours is required'
    } else if(!input.season) {
        errors.season = 'A season is required'
    } else if(!input.countries.length) {
        errors.countries = 'A country is required'
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
        difficulty: '',
        duration: '',
        season: '',
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
                season: e.target.value
            })
        }
    }


    function handleSubmit(e) {
        e.preventDefault();
        console.log(input)
        setErrors(validate(input))
        const alerts = validate(input)
        if (Object.values(alerts).length !== 0) { alert('All fields are required') }
        else {
            dispatch(postActivity(input))
            alert('Activity created succesfully!')
            setInput({
                name: '',
                difficulty: '',
                duration: '',
                season: '',
                countries: []
            })
        }
    };

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

                <h1 className={styles.h1}>Create Activity</h1>
                <form className={styles.container} onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label className={styles.activity}>Activity:</label>
                    <input  className={errors.name && styles.danger} type="text" value= {input.name} name="name"
                    onChange={(e) => handleChange(e)}
                    required/>
                    <br/>
                    {errors.name && (
                        <p className={styles.danger}>{errors.name} </p>
                    )}
                </div>
                <div className={styles.select}>
                    <label>Difficulty:</label>
                    <select className={styles.values} name="difficulty" value={input.difficulty} id="difficulty"  onChange={(e) => handleChange(e)}>
                    <option  hidden  value="---">---</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                 
                    </select>
                    
                    {errors.difficulty && (
                        <p className="error">{errors.difficulty} </p>
                        )}
                </div>
                <div>
                    <label>Duration:</label>
                    <input type="text" value= {input.duration} name='duration'
                    onChange={(e) => handleChange(e)}
                    max='24'
                    min='0'
                    required/>
                    <br/>
                    {errors.duration && (
                        <p className="error">{errors.duration} </p>
                        )}
                </div>
                    <label className={styles.temporada}>Season:</label>
                <fieldset className={styles.check}>
                    <br />
                    <label ></label>
                    <input type="radio" id='Summer' name='season'  value='Summer' 
                    onClick={(e) => handleCheck(e)}
                    defaultChecked
                    required/>Summer                  
                    
                    <label ></label>
                    <input type="radio" id='Spring' name='season' value='Spring' 
                    onClick={(e) => handleCheck(e)}
                    required/>Spring
                    
                    <label ></label>
                    <input type="radio" id='Autumn' name='season' value='Autumn' 
                    onClick={(e) => handleCheck(e)}
                    required/>Autumn
               
                    
                    <label ></label>
                    <input type="radio" id='Winter' name='season' value='Winter' 
                    onClick={(e) => handleCheck(e)}
                    required/>Winter
                    
                    
                 
                </fieldset>
                <select onChange ={e=>handleSelect(e)} defaultValue='country'>
                    <option value ='country' hidden> Select Country</option>
                {countries.map((a)=>(
                    <option key={a.name} value={a.name}>{a.name}</option>
                    ) )}
                
                </select>
                <div>
                        
                        {
                            input.countries.map(e => {
                                return(
                                    <div key={e}>
                                        <h4 >
                                            {e}
                                        </h4>
                                        <input className={styles.x} onClick={() => handleDelete(e)} type="button" value="X" name={e}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                {/* <div className={styles.delete}>
                <p  className={styles.country}>{input.countries.map(e => e + ', ')} </p>
                {input.countries.map(e => 
                <button onClick={() => handleDelete(e)} className={styles.x}>X</button>                        
                    
                    )}
                </div> */}
                <button type='submit'>Create Activity</button>
            </form>
            <Link to = '/home'> <button>Back</button></Link>
                    </div>
            : <div><option>Loading...</option></div>
        }
    
        </div>


        )
}
