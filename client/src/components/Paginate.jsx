import React from "react";
import './paginate.css'

export default function Paginate({ countriesPerPage, countriesCard, paginate }){
    const pageNumbers = []
    for(let i=1; i <= Math.ceil(countriesCard/countriesPerPage); i++){ //math.ceil me redondea para arriba
        pageNumbers.push(i)
    }
    return (
        <nav>
            <ul className="paginate">
                {pageNumbers && pageNumbers.map(number =>(
                    <li key={number}>
                    <button className="btnPaginate" onClick={()=> paginate(number)}>{number}</button>
                    </li>
                ))}
            
                    
            
            </ul>
        </nav>
    )
};








// const Paginate = ({ allcountries, countriesPerPage, paginate }) => {
// 	const pageNumber = [];

// 	for (let i = 1; i <= Math.ceil(allcountries / countriesPerPage); i++) {
// 		pageNumber.push(i);
// 	}

// 	return (
	
// 			<nav>
// 				<ul>
// 					{pageNumber &&
// 						pageNumber.map((n) => (
// 							<li key={n}>
// 								<a onClick={() => paginate(n)}>{n}</a>
// 								{/* <button onClick={() => paginado(n)}>{n}</button> */}
// 							</li>
// 						))}
// 				</ul>
// 			</nav>
		
// 	);
// };

// export default Paginate;