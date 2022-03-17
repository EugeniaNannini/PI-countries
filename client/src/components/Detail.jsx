import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { GetdeleteDetail, getDetail } from "../actions";
import { useParams } from "react-router-dom";
import './detail.css'

export default function CountryDetail(){
    const countryDetail = useSelector((state) => state.detail)
    // const act = countryDetail.activities || [];
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(()=>{
        dispatch(getDetail(id))
        return function (){
            dispatch(GetdeleteDetail())
        }
    },[dispatch, id]);

    // console.log('esto es el detail', id)
    // console.log(country);

    return(
        
        <div className="card">
            <h1 className="title">{countryDetail.name}</h1>
            
            <img src={countryDetail.flag} alt= "" height= "400px" width="550px"></img>
            <div className="text">

            <div> Continents: {countryDetail.continents}</div>
            <div>id: {countryDetail.id}</div>
            <div>Capital:{countryDetail.capital}</div>
            <div>Subregion:{countryDetail.subregion}</div>
            <div>Area:{countryDetail.area} km2</div>
            <div>Population:{countryDetail.population}</div>
            </div>
            <div className="text"> Activities:
                
                { 
                
                countryDetail.activities? countryDetail.activities.map(activity =>(
                    <div key={activity.id}>
                     <h3>Activity: {activity.name}</h3>
                     <h4>Difficulty: {activity.difficulty}</h4>
                     <h4>Duration: {activity.duration} hs</h4>
                     <h4>Season: {activity.season}</h4>
                    </div>
                )) 
                : <h3>"Activities not found"</h3>
                                                                
                }
            
            </div>
            {/* : <h3>Activities not found</h3> */}
        
        


                  

        <Link to='/home'>
            <button className="buttondetail">Back</button>
        </Link>
                          

        
        </div>
        
        

       
        
            
    )
}
