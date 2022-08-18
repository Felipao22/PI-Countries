import React from "react";
import {Link} from 'react-router-dom';
import styles from './LandingPage.module.css'
import imagen from '../../imagen/klipartz.com.png'

export default function LandingPage() {
    return(
        <div style={{height:'70vh'}} className={styles.bodyy}>
            <h1 className={styles.title}>Welcome to the Countries App</h1>
            <br />
            <h2 className={styles.title}>Click in the Earth</h2>
            <Link to ='/home'>
                <img className={styles.image} src={imagen} alt="Imagen no encontrada" />
            </Link>
        </div>
    )
}