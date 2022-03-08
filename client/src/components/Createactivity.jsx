import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createActivity, getCountries } from "../actions";


function validate(input){
    let error = {}
    if(!input.name){
        error.name ="Name is required";
    }else if(!input.difficulty){
        error.difficulty ="Difficulty is required"
    }else if(!input.duration){
        error.duration = "describe days and hours"
    }else if(!input.season){
        error.season = "season is required"
    }
    return error;
}

export default function CreateActivities(){
    const dispatch = useDispatch();
    const countriesSelected = useSelector((state) => state.countries)
    const [error,setError] = useState({})
    
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
    function handleDelete(e){
        setInput({
            ...input,
            countries: input.countries.filter(country => country !== e)
            //// filtrame por todo lo qe no sea ese elemento, me devuleve todo sin ese elemento. 
        })
    }

    // guardo lo que el usuario escribe en el input
    function handleChange(e){
        setInput({
            ...input, //trae todo lo que ya tenía 
            [e.target.name] : e.target.value 
        })
    }
    function handleSelect(e) {
        setInput({
            ...input,
            countries: [...input.countries, e.target.value]
        })
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
    // function handleDifficulty(e){
    //     setInput({
    //         ...input,
    //         difficulty:e.target.value
    //     })
    // }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(createActivity(input))
        setInput({
            name:"",
            difficulty:"",
            duration:"",
            season: ['Summer','Spring','Autumn','Winter'],
            countries:[]
        })
    }
    

    return(
        <div>
            
            <Link to='/home'><button>Back</button></Link>
            <div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <h1>Create your activity</h1>            
                    
                    <div>
                    <label>Name:</label> 
                    <input
                     type='text'
                     required
                     value={input.name}
                     name='name'
                     placeholder="Activity name..."
                     onChange={(e) => handleChange(e)}
                    />
                    {error.name && (<p>{error.name}</p>
                    )}
                    </div>
                    
                    <div>
                        <label>Difficulty:</label>
                        <select 
                        required
                        onChange={(e)=> handleChange(e)} 
                        name='difficulty'
                        value={input.difficulty}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>

                        </select>

                        {error.difficulty && (<p>{error.difficulty}</p>
                     )}

                    </div>
                    <div>
                        <label>Duration:</label>
                        <input
                        required
                        type='number'
                        value={input.duration} 
                        name='duration' 
                        onChange={(e)=> handleChange(e)}>
                        </input>
                        {error.duration && (<p>{error.duration}</p>
                        )}
                    </div>
                    <div>
                        <label>Season:</label>
                        <label><input type='checkbox' name='Summer' value='Summer' onChange={e =>handleCheck(e)}/> Summer </label>
                        <label><input type='checkbox' name='Winter' value='Spring' onChange={e =>handleCheck(e)}/> Winter </label>
                        <label><input type='checkbox' name='Autumn' value='Autumn' onChange={e =>handleCheck(e)}/> Autumn </label>
                        <label><input type='checkbox' name='Spring' value='Spring' onChange={e =>handleCheck(e)}/> Spring </label>
                    </div>
                        {error.name && ( <p>{error.name}</p>
                      )}

                    <div>
                    <label>Countries:</label>
                        <select 
                        onChange={(e)=> handleSelect(e)}>
                        <option>Select countries</option>
                         {/* seleccion de paises que van a tener esa actividad */}
                            {countriesSelected.map((el)=> ( <option key={el.id}>{el.name}</option>))
                            }
                        
                        </select>
                    </div>
                    
                        {error.name && ( <p>{error.name}</p>
                      )}
                
                    
                   
                
                <div>
                 {/* /* ACÁ MUESTRO LOS PAÍSES QUE SE VAN SELECCIONANDO */ }
                 <ul>
						{input.countries.map((e) => (
                                                       
							<li key={e.id}>
								{e}{' '}
								<button onClick={() => handleDelete(e)}>x</button>
                                {' '}
							</li>
						))}
                </ul>
            </div>
            <button type= 'submit'>
                Create activities
            </button>
            </form>
            </div>
        </div>
    )
}