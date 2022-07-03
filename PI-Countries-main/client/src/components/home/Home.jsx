import React from "react";
//import los hooks de react que voy a usar
import { useEffect, useState } from "react";
//importo los hooks de react-redux que voy a usar
import {useDispatch, useSelector} from 'react-redux';
//importo las actions que me interesan usar en este componente
import {getCountries, orderByContinent, orderByName, orderByPopulation} from '../../redux/actions/index'
import {Link} from 'react-router-dom';
//importo los componentes que voy a usar
import Paginado from "../paginado/Paginado";
import { Cards } from "../cards/Cards";
import SearchBar from "../searchbar/SearchBar";
import styles from './Home.module.css';

export default function Home () {
    const dispatch = useDispatch();
    const allCountries = useSelector((state => state.countries));
    // let countriesPerPage = 9;
    const [orden, setOrden] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(10);
    //constantes para el paginado
    const indexOfLastCountry = currentPage * countriesPerPage; // 10 o 9
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage; // 0
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry);
    
    //seteo el estado con el constante numero de pagina
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    
    //dispatch en el componentDidMount
    useEffect(() => {
        dispatch(getCountries())
    },[dispatch])
    
    //funcion para volver a cargar los países
    function handleClick(e){
        e.preventDefault();
        dispatch(getCountries());
        setCurrentPage(1);
    }

    //funcion para ordenar asc o desc
    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }
    //funcion para ordenar de mayor o menor la población
    function handleSortPopulation(e) {
        e.preventDefault();
        dispatch(orderByPopulation(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }
    //funcion para ordernar por continentes
    function handleFilterContinents(e){
        e.preventDefault();
        dispatch(orderByContinent(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }
    console.log(orden)

    return(
        <div>
            <Link to= '/countries' >
            </Link>
            <h1>Countries</h1>
            {/* <input type="text" /> */}
            <button onClick={e => handleClick(e)} >
                Reset
            </button>
                <SearchBar/>
            <div className={styles.selectdiv}>
                <select className={styles.select} onChange={e => handleSort(e)}>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select >
                <select className={styles.select} onChange={e => handleSortPopulation(e)}>
                    <option value='asc' >Menor Población a Mayor Población</option>
                    <option value='desc'>Mayor Población a Menor Población</option>
                </select>
                <select className={styles.select} onChange={e => handleFilterContinents(e)}>
                    <option value='All'>All</option>
                    <option value='Antarctic'>Antarctic</option>
                    <option value='Africa'>Africa</option>
                    <option value='Americas'>Americas</option>
                    <option value='Asia'>Asia</option>
                    <option value='Europe'>Europe</option>
                    <option value='Oceania'>Oceania</option>
                </select>
            </div>
            <div>

                <Paginado
                    countriesPerPage = {countriesPerPage}
                    allCountries = {allCountries.length}
                    paginado = {paginado}
                />
            </div>
            <div>

                <Link to='/activities'>
                    <button>Crear Actividad</button>
                </Link>
            </div>
            <div>

                <Cards currentCountries={currentCountries} />
            </div>
            <div>
                 <Paginado
                    countriesPerPage = {countriesPerPage}
                    allCountries = {allCountries.length}
                    paginado = {paginado}
                />

            </div>
            </div>
    )
}