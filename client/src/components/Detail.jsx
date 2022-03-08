import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getDetail } from "../actions";
import { useParams } from "react-router-dom";

export default function CountryDetail(props){
    const country = useSelector((state) => state.detail)
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(()=>{
        dispatch(getDetail(id))
    },[dispatch, id]);

    //console.log('esto es el detail', id)

    return(
        <div>
            {
                country?
                <div>
                    <h1>{country.name}</h1>
                    <img src = {country.flags} alt='img not found'width='250px' height='175px' />
                    <h2>Continent: {country.continent}</h2>
                    <h3>Capital: {country.Capital}</h3>
                    <h4>Subregion: {country.Subregion}</h4>
                    <h5>Area: {country.Area}</h5>
                    <h5>Population: {country.Population}</h5>
                   <div>{country.Activities?.map(element => {
                       return(
                           <div>
                               <h6>Activity:{element.name}</h6>
                               <h6>Difficulty:{element.difficulty}</h6>
                               <h6>Duration:{element.duration}</h6>
                               <h6>Seacon:{element.season}</h6>
                            </div>
                       )})}</div>
                       </div> : <p>Sorry, details not found</p>
                    }
                    <Link to='home'><button>Back</button></Link>

                </div>
            
        
            
    )
}