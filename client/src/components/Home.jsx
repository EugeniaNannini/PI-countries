import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState} from "react";
import { getCountries, getActivities, filterByContinent, filterByActivity, filterByAlphabeticalOrder, filterByPopulationOrder } from '../actions';
import { Link } from 'react-router-dom'
import Card from "./Card";
import Paginate from './Paginate';




export default function Home(){
    const dispatch = useDispatch()
    //const allcountries = useSelector((state)=> state.countries)
    const activities = useSelector((state) => state.activities);
    const countriesCard = useSelector((state) => state.countries);
    // paginado ---

     const[currentPage,setCurrentPage] = useState(1) //pag 1
     let countriesPerPage = 0;
     if(currentPage === 1) {
         countriesPerPage = 9;
     }
     if(countriesPerPage >= 2){
     countriesPerPage = 10;
     }
//     const[countriesPerPage, setCountriesPerPage] = useState(9)

//     //guarda el index del ult pais de la multiplicación
//     //Posicion del ultimo pais
  const indexOfLastCountry = currentPage * countriesPerPage;//9
// //    //Posicion del primer pais
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage //0
// //    // Se divide el array de acuerdo a la cantidad de paises necesarios (9)

const currentCountries = countriesCard?.slice(indexOfFirstCountry, indexOfLastCountry); 
// //     //del estado.
// const [order,setOrder] = useState("");
const paginate = (pageNumbers) =>{
        setCurrentPage(pageNumbers);
    };
//traigo paises cuando el componente se monta
    useEffect(()=>{
        dispatch(getCountries());
        dispatch(getActivities());
        // console.log(countries)

    },[dispatch])


//reseteo/volver a cargar de paises
    function HandleClick(e){
        e.preventDefault()
        dispatch(getActivities())
    }
    //los payload son los value de las options
    function handleFilterByContinent(e){
        dispatch(filterByContinent(e.target.value))
    }
    function handleFilterByActivity(e){
        dispatch(filterByActivity(e.target.value))
    }
    function handleFilterByAlphabeticalOrder(e){
        dispatch(filterByAlphabeticalOrder(e.target.value))
    }
    function handleFilterByPopulationOrder(e){
        dispatch(filterByPopulationOrder(e.target.value))
    }



    return(
        <div>
            <button onClick={e=>{HandleClick(e)}}>Refresh Countries </button>
            <div>
                {/* filtro por continente */}
                <select onChange={e=> handleFilterByContinent(e)}> 
                    <option value='All'> All continents</option>
                    <option value='South America'>South America</option>
                    <option value='North America'>North America</option>
                    <option value='Europe'>Europe</option>
					<option value='Africa'>Africa</option>
					<option value='Asia'>Asia</option>
					<option value='Oceania'>Oceania</option>
					<option value='Antarctica'>Antarctica</option>
                </select>
                {/* filtro por actividad turística  */}
                <select onChange={e=> handleFilterByActivity(e)}>
                    <option value='Nothing'>Select activities</option>
                    <option value='All'>All</option>
                    {activities.map((i)=>(
                        <option value={i.name}>{i.name}</option>
                    ))}
                </select>
                {/* filtro por orden alfabetico  */}
                <select onChange={e=> handleFilterByAlphabeticalOrder(e)}>
                    <option value='Asc'>A-Z</option>
                    <option value='Des'>Z-A</option>
                </select>
                {/* filtro por cantidad de población  */}
                <select onChange={e=> handleFilterByPopulationOrder(e)}>
                    <option value='Asc'>More populated</option>
                    <option value='Des'>Less populated</option>
                </select>
               
                <Paginate
                countriesPerPage = {countriesPerPage} //10
                countriesCard={countriesCard?.length} //250
                paginate={paginate}>
                </Paginate>
                
               
            <div>
            {currentCountries?.map((country) => {
                  return (
                     <div key={country.id}>
                        <Card
                           name={country.name}
                           flags={country.flags}
                           continents={country.continents}
                           id={country.id}
                        />
                     </div>
                  );
               })
            }
            
            </div>
            </div>
        </div>
        
    )
}

