import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountries } from "../../redux/actions";
import styles from './SearchBar.module.css'


export default function SearchBar({setCurrentPage}) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    
    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getNameCountries(name));
        setCurrentPage(1)
    }


    return(
        <div className={styles.searchbar}>
            <input className={styles.input} type="text" placeholder="Buscar País" onChange={(e) => handleInputChange(e) } />
            <button type="submit" onClick={(e) => handleSubmit(e)} >Buscar</button>
        </div>
    )
}