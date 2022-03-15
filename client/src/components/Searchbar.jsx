import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName, getCountries } from "../actions";
import "./searchbar.css"

export default function SearchBar(){
    const dispatch = useDispatch()
    
    const [name,setName] = useState("") //estado local, lo seteo en un string vacio
    //guardo todo lo que vaya apareciendo en el input

    // useEffect(() => {
    //     dispatch(getByName(name));
    // },[dispatch, name]);

    // function validator () { 
    //     let error = [];
    //     if(input.name !== countries ){

    //     }


    // }

    function HandleChange(e){
        e.preventDefault()
        setName(e.target.value)//agarro el value del input
        console.log(name) 
    }
    function HandleSubmit(e){
        e.preventDefault()
        dispatch(getByName(name));
        setName("");
    };

    return(
        <div className="container">
            
            <input className="input"
            type='text'
            placeholder= 'Search..'
            // value={input.name}
            onChange={(e)=> HandleChange(e)}>
            </input>
            <button className="searchButton" onClick={(e) => HandleSubmit(e)} type ="submit">Search</button>
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