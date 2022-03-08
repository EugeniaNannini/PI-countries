import React from "react";
import { Link } from "react-router-dom";
import './card.css';

export default function Card({flags, name, continents, id}){
    //console.log(name) 
    return(
        <Link to = {`/countries/${id}`}>
            <div key={id} className="card">
                
                <img className="imgCard"
                  src = {flags} alt = "Not found"
                />
                <div className="props" key={id}>
                    <p className="nameCountry">{name}</p>
                    <p className="continentCountry">continents: {continents.toString()}</p>
                </div>

            </div>
        </Link> 
    )
}