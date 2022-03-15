const initialState = {
    countries : [],  //todos los paises, para ordenar,mostrar
    copiaCountries: [], //la copia, el de filtros, el que se modifica(estado auxiliar)
    activities:[],//se guardan las act 
    detail: []
}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET COUNTRIES':
            return{
                ...state,
                countries: action.payload,
                copiaCountries: action.payload
            }
        case 'GET_ACTIVITIES':
        return{
            ...state,
            activities: action.payload 
        }
        case 'FILTER_BY_CONTINENT':
            const allcountries = state.copiaCountries;
            const continentFiltered = action.payload === "All" ?
            allcountries : allcountries.filter(el => el.continents === action.payload)
            return{
                ...state,
                countries: continentFiltered
            };
        case 'FILTER_BY_ACTIVITY':
            const act = state.countries
            let result
            if(action.payload === 'All') result = state.copiaCountries
            result = act.filter((e) => e.activities[0]?.name === action.payload)
            return{
                ...state,
                countries : result
        };
    
            
            

        case 'FILTER_BY_ALPHABETICAL_ORDER':
            const orderAZ = action.payload === 'asc' ?
            state.countries.sort((a,b) => (a.name > b.name ? 1 : -1)): state.countries.sort((a, b) => (a.name > b.name ? -1 : 1)) 
            console.log(orderAZ)
            return {
                ...state,
                countries:orderAZ
            }

        case 'FILTER_BY_POPULATION_ORDER':
            const population = action.payload === 'Des' ? 
            state.countries.sort((a,b) => a.population - b.population) :
            state.countries.sort((a,b) => b.population - a.population)
            return{
                ...state,
                countries: population
            }
        case 'GET_BY_NAME' :
            return{
                ...state,
                countries: action.payload
            }
        case 'GET_DETAIL' :
            return{
                ...state,
                detail: action.payload
            }
        case 'CREATE_ACTIVITY': //me devuelve el estado como esta porque yo voy a crearlo
        //en una ruta nueva
            return{
                ...state,
            }
        
        default:
			return state;



    }
    

}
// export default rootReducer;