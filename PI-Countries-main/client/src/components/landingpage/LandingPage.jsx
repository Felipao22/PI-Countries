import React from "react";
import {Link} from 'react-router-dom';
import './LandingPage.css'

export default function LandingPage() {
    return(
        <div>
            <h1>Bienvenidos a la App de Countries</h1>
            <Link to ='/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}