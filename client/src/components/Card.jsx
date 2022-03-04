import React from "react";
import { Link } from "react-router-dom";

export default function Card({flags, name, continents, id}){
    //console.log(name) 
    return(
        <Link to = {`/countries/${id}`}>
            <div key={id}>
                
                <img 
                  src = {flags} alt = "Not found"
                />
                <div key={id}>
                    <p>{name}</p>
                    <p>continents: {continents.toString()}</p>
                </div>

            </div>
        </Link> 
    )
}