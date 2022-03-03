import React from "react";

export default function Paginate({countriesPerPage, allcountries, paginate}){
    const pageNumber = []
    for(let i=1; i <= Math.ceil(allcountries/countriesPerPage); i++){
        pageNumber.push(i)
    }
    return (
        <nav>
            <ul>
                {pageNumber && pageNumber.map(number =>(
                    <button key={number}onClick={()=> paginate(number)}>{number}</button>

                ))}
            
                    
            
            </ul>
        </nav>
    )
}