import React from "react";
import { Link } from "react-router-dom";
import './card.css';

export default function Card({id, flag, name, continents, area}){
    //console.log(name) 
    return(
        <div>
        <Link to = {`/countries/${id}`}>
            <button className="btn"> <span className=".btnspan"></span>View detail</button> 
        </Link> 
        
            <div key={id} className="card">
                
                <img className="imgCard"
                  src = {flag} alt = "Not found"
                />
                <div className="props">
                    <p className="nameCountry"> Country: {name}</p>
                    <p className="continentCountry">Continents: {continents}</p>
                    <p className="continentCountry">Area: {area}</p>
                </div>

            </div>
        </div>

    )
}