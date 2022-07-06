import React from "react";
import Card from "../card/Card";
import styles from './Cards.module.css'


export const Cards = ({currentCountries}) => {

  return (
    <div className={styles.tarjetas}>
        { currentCountries?.map(c => {
            return(
                <Card key={c.id} name={c.name} flags={c.flags} continents={c.continents} id={c.id}/>
            )
        })
        }
    </div>
  )
}