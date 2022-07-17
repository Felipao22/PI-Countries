import React from "react";
import {Link} from 'react-router-dom';
import styles from './LandingPage.module.css'

export default function LandingPage() {
    return(
        <div>
            <h1 className={styles.title}>Welcome to the Countries App</h1>
            <Link to ='/home'>
                <button className={styles.boton}>Get Started</button>
            </Link>
        </div>
    )
}