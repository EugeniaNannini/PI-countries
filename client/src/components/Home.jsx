import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState} from "react";
import { getCountries, getActivities, filterByContinent, filterByActivity, filterByAlphabeticalOrder, filterByPopulationOrder, filterByArea } from '../actions';
import Card from "./Card";
import Paginate from './Paginate';
import SearchBar from './Searchbar';
import './home.css';
import { Link } from 'react-router-dom';


 
export default function Home(){
    const dispatch = useDispatch()
    let activities = useSelector((state) => state.activities);
    const countriesCard = useSelector((state) => state.countries);
    console.log(activities)


    // paginado ---

     const[currentPage,setCurrentPage] = useState(1) //pag 1
     const [countriesPerPage] = useState(10)   
     const indexOfLastCountry = currentPage * countriesPerPage //Posicion del ultimo pais
     const indexOfFirstCountry = indexOfLastCountry - countriesPerPage //Posicion del primer pais
     const currentCountries = currentPage === 1 ?  //si estoy en la primer pag recorro countr y devuelvo posic en el primer pais - el ult menos 1
     countriesCard.slice(indexOfFirstCountry, indexOfLastCountry -1) :    // Se divide el array de acuerdo a la cantidad de paises necesarios (9)
     countriesCard.slice(indexOfFirstCountry, indexOfLastCountry)
     const paginate = (pageNumbers)=>{
         setCurrentPage(pageNumbers)
     }
     const [order,setOrder] = useState("");






     var hash = {};

     activities = activities.filter(function(current) {
     var exists = !hash[current.name];
     hash[current.name] = true;
     return exists;
     
 });



//traigo paises cuando el componente se monta
    useEffect(()=>{
        dispatch(getCountries());
        dispatch(getActivities());
        
        

    },[dispatch])
    

//reseteo/volver a cargar de paises
    function HandleClick(e){
        e.preventDefault()
        dispatch(getActivities())
        dispatch(getCountries());
    }
    //los payload son los value de las options
    function handleFilterByContinent(e){
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterByContinent(e.target.value))
        setOrder(`Order ${e.target.value}`)
        
    }
    function handleFilterByActivity(e){
        setCurrentPage(1)
        if(e.target.value === "All"){
            dispatch(getCountries())
            setCurrentPage(1)
        }
        dispatch (filterByActivity(e.target.value))
        setOrder(`Order ${e.target.value}`)
    } 

    
    function handleFilterByAlphabeticalOrder(e){
        dispatch (filterByAlphabeticalOrder(e.target.value))
        setCurrentPage(1);
        setOrder(`Order ${e.target.value}`)

        
    }
    function handleFilterByPopulationOrder(e){
        dispatch(filterByPopulationOrder(e.target.value))
        setCurrentPage(1); 
        setOrder(`Order ${e.target.value}`)
    }
    function handleFilterByArea(e){
        dispatch(filterByArea(e.target.value))
        setCurrentPage(1)
        setOrder(`Order ${e.target.value}`)
    }

    



    return(
        <div className='home'>
            <div>
            <button onClick={e=>{HandleClick(e)}} className="refresh"> Refresh Countries </button>
            </div>
            <div className='containerFilter'>
                {/* filtro por continente */}
                <div className='filter'>
                
                <select onChange={e=> handleFilterByContinent(e)} className='filselect'> 
                    <option value="DEFAULT" hidden>Continents</option>
                    <option value='All'> All continents</option>
                    <option value='South America'>South America</option>
                    <option value='North America'>North America</option>
                    <option value='Europe'>Europe</option>
					<option value='Africa'>Africa</option>
					<option value='Asia'>Asia</option>
					<option value='Oceania'>Oceania</option>
					<option value='Antarctica'>Antarctica</option>
                </select>
                </div>
                
                {/* filtro por actividad tur??stica  */}
                <div className='filter'>
                <select onChange={e=> handleFilterByActivity(e)} className='filselect'>
                    <option value= "DEFAULT" hidden>Sort by activities</option>
                    <option value='All'>All</option>
                    {
                    activities.map((el)=> (
                    <option key={el.name} value={el.name}>{el.name}</option>))}
                </select>
                </div>
                {/* filtro por orden alfabetico  */}
                <div className='filter'>
                <select onChange={e=>handleFilterByAlphabeticalOrder(e)} className='filselect'>
                    <option value="DEFAULT"  hidden>Alphabetic</option>
                    <option value='asc'>A-Z</option>
                    <option value='des'>Z-A</option>
                </select>
                </div>
                {/* filtro por area */}
                <div onChange={e=>handleFilterByArea(e)} className='filter'>
                    <select className='filselect'>
                        <option value="DEFAULT" hidden> Area</option>
                        <option value= 'asc' name="asc" >More area</option>
                        <option value= 'des' name="des">Less area</option>


                    </select>
                </div>
                {/* filtro por cantidad de poblaci??n  */}
                <div className='filter'>
                <select onChange={e=> handleFilterByPopulationOrder(e)} className='filselect'>
                    <option value="DEFAULT" hidden>Sort by Population </option>
                    <option value='Asc'>More populated</option>
                    <option value='Des'>Less populated</option>
                </select>
                </div>
                </div>
                <div>
                    <Link to='/activities'>
                        <button className='linkact'> Create Activity</button>
                
                    </Link>
                </div>
                <SearchBar setCurrentPage={setCurrentPage} />
               
                <Paginate
                countriesPerPage = {countriesPerPage} //10
                countriesCard={countriesCard?.length} //250
                paginate={paginate}>
                </Paginate>
                
               
            <div className='cards'>
            {currentCountries?.map((country) => {
                  return (
                     <div key={country.id}>
                        
                        <Card
                           name={country.name}
                           flag={country.flag}
                           continents={country.continents}
                           id={country.id}
                           area={country.area}
                        />
                        
                     </div>
                  );
               })
            }
            
            </div>
            
        </div>
        
    )
}

