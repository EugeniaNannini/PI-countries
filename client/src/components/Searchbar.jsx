import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../actions";

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name,setName] = useState("")

    useEffect(() => {
        dispatch(getByName(name));
    },[dispatch, name]);

    function HandleChange(e){
        setName(e.target.value);
    }

    return(
        <div>
            <input
            type='text'
            placeholder= 'Search..'
            onChange={(e)=> HandleChange(e)}>
            </input>
        </div>
    );


}