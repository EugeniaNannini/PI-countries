import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState} from "react";
import { getCountries, getActivities, filterByContinent, filterByActivity, filterByAlphabeticalOrder, filterByPopulationOrder } from '../actions';
import { Link } from 'react-router-dom'
import Card from "./Card";
import Paginate from './Paginate';




export default function Home(){
    const dispatch = useDispatch()
    const allcountries = useSelector((state)=> state.countries)
    const activities = useSelector((state) => state.activities)
    // paginado ---

//     const[currentPage,setCurrentPage] = useState(1)
//     const[countriesPerPage, setCountriesPerPage] = useState(9)

//     //guarda el index del ult pais de la multiplicación
//     //Posicion del ultimo pais
//    const LastCountry = currentPage * countriesPerPage;
//    //Posicion del primer pais
//    const FirstCountry = LastCountry - countriesPerPage;
//    // Se divide el array de acuerdo a la cantidad de paises necesarios (9)

//    const currentCountries = allcountries.slice(FirstCountry, LastCountry); //allcountries:el arreglo
//     //del estado.
//     //const [order,setOrder] = useState("");
//     const paginate = (pageNumber) =>{
//         setCurrentPage(pageNumber)
//     }

    useEffect(()=>{
        dispatch(getCountries());
    },[dispatch])

    useEffect(()=>{
        dispatch(getActivities());
    },[dispatch])
//reseteo de paises
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
               
                {/* <Paginate
                countriesPerPage = {countriesPerPage}
                allcountries={allcountries.length}
                paginate={paginate}
                currentPage={currentPage}>
                </Paginate> */}
                
               
                {allcountries?.map(el=>{
                    return(
                        <div>
                            <Link to={'/home' + el.id}>
                            <Card name={el.name} continent={el.continent} img={el.img}/>
                            </Link>
                        </div>
                    )
                })

                }
            </div>
        </div>
        
    )
}

