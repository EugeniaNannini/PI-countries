const initialState = {
    countries : [],
    allcountries: [], //se guardan los paises de la bd
    activities:[],//se guardan las act de la bd
    detail: {}
}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET COUNTRIES':
            return{
                ...state,
                countries: action.payload,
                allcountries: action.payload
            }
        case 'GET_ACTIVITIES':
        return{
            ...state,
            activites: action.payload //en occupations guardame el action.payload
        }
        case 'FILTER_BY_CONTINENT':
            const allcountries = state.countries
            const continentFiltered = action.payload === "All" ?
            allcountries : allcountries.filter(el => el.continent === action.payload)
            return{
                ...state,
                countries: continentFiltered
            };
        case 'FILTER_BY_ACTIVITY':
            const array = []
            state.allcountries.map(el => el.activities.forEach(element => {
                if(element.name === action.payload) {
                    array.push(el)
                }
            }))
            return{
                ...state,
                countries: array
            }
        case 'FILTER_BY_ALPHABETICAL_ORDER':
            const orderAZ = action.payload === 'az' ?
            state.countries.sort((a,b) =>{ //va comparando y va poniendo el orden en el arreglo dependiendo si son mas grandes o mas chicos
                if(a.name > b.name){  //compara el que encuentra primero con el que encuentra despues
                    //si es mayor retorna 1, que es la posicion 1
                    return 1;
                }
                if(b.name > a.name){
                    return -1;
                }
                return 0; //significa que lo devuelve igual si son iguales
            }) :
            state.allcountries.sort((a,b) =>{ //que este ordenado desc, de la otra forma, de menor a mayor
                if(a.name > b.name){return -1;}
                if(b.name < a.name){return +1;}
                return 0;
            })
            return {
                ...state,
                allcountries:orderAZ
            }
        case 'FILTER_BY_POPULATION_ORDER':
            const population = action.payload === 'des' ? 
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