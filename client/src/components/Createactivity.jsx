import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createActivity, getCountries } from "../actions";
import './createactivity.css'

function validate(input){
    let error = {}
    if(!input.name){
        error.name ="Name is required";
    }else if(!input.difficulty){
        error.difficulty ="Difficulty is required"
    }else if(!input.duration){
        error.duration = "hour"
    }else if(!input.season){
        error.season = "Season is required"
    }else if(!input.countries){
        error.countries = "Country si required"
    }
    return error;
}

export default function CreateActivities(){
    const dispatch = useDispatch();
    const countriesSelected = useSelector((state) => state.countries)
    const [error,setError] = useState({})
    const act = useSelector((state) => state.activities)
    //guardo el formulario en el estado
    const [input, setInput] = useState({ //le paso todo lo que necesita el post
        name:"",
        difficulty:"",
        duration:"",
        season: ['Summer','Spring','Autumn','Winter'],
        countries:[]
    })


    
    useEffect(()=>{
        dispatch(getCountries())
        
    },[dispatch]);

    //elimino del target.value el pais seleccionado
    function handleDelete(id){
        setInput({
            ...input,
            countries: input.countries.filter(country => country !== id)
            //// filtrame por todo lo qe no sea ese elemento, me devuleve todo sin ese elemento. 
        })
    }

    // guardo lo que el usuario escribe en el input
    function handleChange(e){
        setInput({
            ...input, //trae todo lo que ya tenía 
            [e.target.name] : e.target.value //you can then have a generic onChange event handler and use the event.target.name to 
            //access properties in the state that have the same name as your inputs
        })
        setError(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }
    function handleSelect(e) {
       
    if(!input.countries.includes(e.target.value)){
        
        setInput({
            ...input,
            countries: [...input.countries, e.target.value]
        });
    }else{
    alert("Country selected")
}
        setError(validate({
            ...input,
            countries: [...input.countries, e.target.value]
        }))
        
    }
    function handleSelectDifficulty(e){
        setInput({
            ...input,
            difficulty: [...input.difficulty, e.target.value]
        });
        setError(validate({
            ...input,
            [e.target.name] : e.target.name
        }))
        }
    
    
    function handleCheck(e){
        if(e.target.checked){
        setInput({
            ...input,
            season:e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name] : e.target.name
        }))
        }
    
    }

    function handleSubmit(e){

        e.preventDefault()
        dispatch(createActivity(input))
        alert('Activity Created')
        setInput({
            name:"",
            difficulty:"",
            duration:"",
            season: ['Summer','Spring','Autumn','Winter'],
            countries:[]
        })

        console.log(input)
    }
    
    console.log('countries selected ', countriesSelected)
    return(
        <div className="form">
            
            <Link to='/home'><button className="back">Back</button></Link>
            <div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <h1>Create your activity</h1>            
                    
                    <div className="name">
                    <label>Name:</label> 
                    <input
                     type='text'
                     required
                     value={input.name}
                     name='name'
                     placeholder="Activity name..."
                     onChange={(e) => handleChange(e)}
                    />
                    {error.name && (<p className="error">{error.name}</p>
                    )}
                    </div>
                    
                    <div className="select">
                        <label>Difficulty:</label>
                        <select 
                        required
                        value={input.difficulty}
                        onChange={(e)=> handleSelectDifficulty(e)} 
                        name='difficulty'
                        >
                            {/* <option hidden> Select difficulty</option> */}
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>

                        </select>

                        {error.difficulty && (<p className="error">{error.difficulty}</p>
                        
                     )}

                    </div>
                    <div className="select">
                        <label>Duration: (hs) </label>
                        <input
                        required
                        min={0}
                        type='number'
                        value={input.duration} 
                        name='duration' 
                        onChange={(e)=> handleChange(e)}>
                        </input>
                        {error.duration && (<p className="error">{error.duration}</p>
                        )}
                    </div>
                    <div className="select">
                        <label>Season:</label>
                        <label><input  required type='checkbox' name='Summer' value='Summer' onChange={e =>handleCheck(e)}/> Summer </label>
                        <label><input required type='checkbox' name='Winter' value='Winter' onChange={e =>handleCheck(e)}/> Winter </label>
                        <label><input required type='checkbox' name='Autumn' value='Autumn' onChange={e =>handleCheck(e)}/> Autumn </label>
                        <label><input required type='checkbox' name='Spring' value='Spring' onChange={e =>handleCheck(e)}/> Spring </label>
                    </div>
                        {error.season && ( <p className="error">{error.season}</p>
                      )}

                    <div className="select"> {/* seleccion de paises que van a tener esa actividad */}
                    <label>Select Countries related to this activity:</label>
                        <select

                        name='countries' 
                        
                        onChange={(e)=> handleSelect(e)} >

                        {countriesSelected.map((country)=>(
                            <option key={country.name} value={country.id}>
                                    {country.name}
                            </option>
                            
     
                        ))}
                        </select>
                         {error.countries && (
                          <p className="error">{error.countries}</p>
                      )}
                    </div>
                    <div>
                        
                        {input.countries && input.countries.length
                        ? input.countries.map((country)=>(
                            <p key={country}>
                                {country}
                            <button type="button"
                            onClick={()=> handleDelete(country)}>x</button>
                            </p>
                        ))
                        : ""}
                    </div>               
				
            <div>
            <button disabled={!input.countries} type='submit'>
				Create Activity
			</button> 
            
            </div>                          

        </form>
        </div>

        </div>
    )
}
