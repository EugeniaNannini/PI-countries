import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByName, getCountries } from "../actions";
import "./searchbar.css"

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState("") //estado local, lo seteo en un string vacio
    //guardo todo lo que vaya apareciendo en el input



    function HandleChange(e){
        e.preventDefault()
        setName(e.target.value)//agarro el value del input
        console.log(name) 
    }
    function HandleSubmit(e){
        e.preventDefault()
        dispatch(getByName(name));
        setName(" ");
   };

    return(
        <div className="container">
            <form onSubmit={(e) => HandleSubmit(e)} >
            
            <input className="input"
            type='text'
            value={name}
            placeholder= 'Search..'
            onChange={(e)=> HandleChange(e)}>
            </input>
            <button className="searchButton" type ="submit">Search</button>
            </form >
        </div>
    );


}



/* <div className="container">
<input className="input"
type='text'
placeholder= 'Search..'
onChange={(e)=> HandleChange(e)}>
</input>
<button className="searchButton" onClick={(e) => HandleSubmit(e)} type ="submit">Search</button>
</div>
); */