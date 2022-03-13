import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getDetail } from "../actions";
import { useParams } from "react-router-dom";

export default function CountryDetail(){
    const country = useSelector((state) => state.detail)
    const act = country.activities || [];
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(()=>{
        dispatch(getDetail(id))
    },[dispatch, id]);

    // console.log('esto es el detail', id)
    // console.log(country);

    return(
        
        <div>
            <h1>{country.name}</h1>
            
            <img src={country.flag} alt= "" height= "400px" width="550px"></img>

            <div> Continents: {country.continents}</div>
            <div>id: {country.id}</div>
            <div>Capital:{country.capital}</div>
            <div>Subregion:{country.subregion}</div>
            <div>Area:{country.area} km2</div>
            <div>Population:{country.population}</div>
            

            <div>Activity: {act.map(a =>
             <span >
             <div>Name: {a.name}</div>
             <div>Difficulty: {a.difficulty}</div>
             <div>Duration: {a.duration}</div>
             <div>Season: {a.season}</div>
             </span>)} 
             </div>

        <Link to='/home'>
            <button>Back</button>
        </Link>
                          

        </div>
        
        

       
        
            
    )
}
