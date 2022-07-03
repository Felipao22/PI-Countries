import React from "react";
import styles from './Card.module.css'
import { Link } from "react-router-dom";
// import { setDetail, getDetail } from "../../redux/actions";

export default function Card({flags, name, continents, id} ) {
    return(
        <Link style={{textDecoration: 'none'}} to={'/countries/'+ id} className={styles.container} key={id}>
            <img src={flags} alt="Bandera del país no encontrada" />
            <h3>{name}</h3>
            <h5>{continents} </h5>       
        </Link>
    )
}