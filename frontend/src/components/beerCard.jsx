import React from "react"
import { useEffect, useState } from "react"
import "./beerCard.css"

function BeerCard({ beerImage, status, beerName, beerAddress, onClick, active}) {
    
    return (
        <div className={`beer-card`} onClick={() => onClick(beerName)}>
            <img className={`beer-image${active ? " active" : ""}`} src={beerImage} alt={"thisimage"}/>
        </div>
    )
}

export default BeerCard
