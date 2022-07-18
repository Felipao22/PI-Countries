import React from "react";
import {Link} from 'react-router-dom';
import styles from './LandingPage.module.css'
import imagen from '../../imagen/klipartz.com.png'

export default function LandingPage() {
    return(
        <div className={styles.body}>
            <h1 className={styles.title}>Welcome to the Countries App</h1>
            <Link to ='/home'>
                <img className={styles.img} src={imagen} alt="Imagen no encontrada" />
            </Link>
        </div>
    )
}