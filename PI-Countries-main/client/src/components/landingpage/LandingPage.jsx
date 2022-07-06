import React from "react";
import {Link} from 'react-router-dom';
import styles from './LandingPage.module.css'

export default function LandingPage() {
    return(
        <div>
            <h1 className={styles.title}>Bienvenidos a la App de Countries</h1>
            <Link to ='/home'>
                <button className={styles.boton}>Ingresar</button>
            </Link>
        </div>
    )
}