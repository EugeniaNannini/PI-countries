import React from "react";

export default function Card({img, name, continent}){
    return(
        <div>
            <h3>{name}</h3>
            <img src={img} alt='img not found' width='250px' height='175px'/>
            <h3>{continent}</h3>
        </div>
    )
}