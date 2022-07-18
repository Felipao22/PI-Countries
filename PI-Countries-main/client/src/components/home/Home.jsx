import React from "react";
//import los hooks de react que voy a usar
import { useEffect, useState } from "react";
//importo los hooks de react-redux que voy a usar
import {useDispatch, useSelector} from 'react-redux';
//importo las actions que me interesan usar en este componente
import {getActivities, getCountries, orderByContinent, orderByName, orderByPopulation, filterActivity} from '../../redux/actions/index'
import {Link} from 'react-router-dom';
//importo los componentes que voy a usar
import Paginado from "../paginado/Paginado";
import { Cards } from "../cards/Cards";
import SearchBar from "../searchbar/SearchBar";
// import FiltActivity from '../filtactivity/FiltActivity'
import styles from './Home.module.css';

export default function Home () {
    const dispatch = useDispatch();
    const allCountries = useSelector((state => state.countries));
    const allActivities = useSelector((state) => state.stateActivity);
    // let countriesPerPage = 9;
    const [orden, setOrden] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(10);
    //constantes para el paginado
    const indexOfLastCountry = currentPage * countriesPerPage; // 10
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

    useEffect(() => {
        dispatch(getActivities())
    },[dispatch, currentPage])


    
    //funcion para volver a cargar los países
    function handleClick(e){
        e.preventDefault();
        dispatch(getCountries());
        setCurrentPage(1);
    }

    //funcion para ordenar asc o desc
    function handleSort(e){
        e.preventDefault();
        setCurrentPage(1);
        dispatch(orderByName(e.target.value));
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
    // funcion para mostrar las actividades
    function handleChange(e) {
        e.preventDefault()
        dispatch(filterActivity(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    // function handleFilterUnderPopulation(e) {
    //     e.preventDefault();
    //     dispatch(orderByUnderPopulation(e.target.value))
    //     setCurrentPage(1)
    //     setOrden(`Ordenado ${e.target.value}`)
    // }



    console.log(orden)
    console.log(allActivities);
    
    return(
        <div>
            <Link to= '/countries' >
            </Link>
            <div >
            <h1 className={styles.title}>Countries App</h1>
            </div>
            <SearchBar 
            setCurrentPage={setCurrentPage}
            />
                
            <div className={styles.selectdiv}>
                <select className={styles.select} onChange={e => handleSort(e)}>
                    <option value='asc'>Ascendent</option>
                    <option value='desc'>Descendent</option>
                </select >
                <select className={styles.select} onChange={e => handleSortPopulation(e)}>
                    <option value='asc' >Lower Population to Higher Population </option>
                    <option value='desc'>Higher Population to Lower Population</option>
                </select>
                <select className={styles.select} onChange={(e) => handleFilterContinents(e)}>
                    <option value='All'>All</option>
                    <option value='Antarctic'>Antarctic</option>
                    <option value='Africa'>Africa</option>
                    <option value='Americas'>Americas</option>
                    <option value='Asia'>Asia</option>
                    <option value='Europe'>Europe</option>
                    <option value='Oceania'>Oceania</option>
                </select>
                {/* <select onChange={e => handleFilterUnderPopulation(e)} >
                    <option value="All">All</option>
                        <option value='Lessthan'> Less than</option>
                    

                </select> */}
                <div>
                <div>
                <select className={styles.select} onChange={e => handleChange(e)}>
                    <option value="All">All</option>
                    {allActivities? allActivities.map(e => 
                        <option value={e.name} key={e.name}>{e.name[0].toUpperCase() + e.name.substring(1)}</option>
                        )
                        : <div><option>Loading</option></div>
                    }

                    
                    </select>
                    </div>
                </div>
           
            </div>
            <div>

                <Paginado
                    countriesPerPage = {countriesPerPage}
                    allCountries = {allCountries.length}
                    paginado = {paginado}
                />
            </div>
            <div className={styles.divx}>

                <Link to='/activities'>
                    <button>Create Activity</button>
                </Link>
            <button onClick={e => handleClick(e)} >
                Reset
            </button>
                <Link to='/'>
                <button>Landing Page</button>

                </Link>
            </div>
            <div>
                <Cards currentCountries={currentCountries} />
                                
            </div>
            {/* <div>
                 <Paginado
                    countriesPerPage = {countriesPerPage}
                    allCountries = {allCountries.length}
                    paginado = {paginado}

                />

            </div> */}
            </div>
    )
}