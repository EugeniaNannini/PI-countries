import axios from 'axios';

//acciones p/home :get countries, get activities
//filtros: por continente, por tipo de actividad turistica
//ordenar asc y dec por orden alfabetico y ordenar asc y desc por cantidad de population
//input de busq para buscar por name (para componente search bar)
//detalle/detail para componente detail ---> GET DETAIL
//create/post activity para componente createActivity

export function getCountries(){
    return async function (dispatch)  {
        try{
        const json = await axios.get("http://localhost:3001/countries");
        console.log('INFO QUE ME TRAE LA API', json.data)
        dispatch({
            type: 'GET COUNTRIES',
            payload: json.data
        });
    }catch(error){
        console.log(error)
    }
    };
};
export function getActivities(){
    return async function(dispatch){
        try{
        const json = await axios.get("http://localhost:3001/activities");
        console.log('TRAIGO ACTIVITIES' , json.data)
        dispatch({
            type: 'GET_ACTIVITIES',
            payload: json.data
        });
        }catch(error){
            console.log(error)
        }
    };
};   
export function filterByContinent(payload){
    return{
        type: 'FILTER_BY_CONTINENT',
        payload,
    }

}
export function filterByActivity(payload){
    return{
        type:'FILTER_BY_ACTIVITY',
        payload,
    }

}
export function filterByAlphabeticalOrder(payload){
    return{
        type:'FILTER_BY_ALPHABETICAL_ORDER',
        payload,
    }
    
}
export function filterByPopulationOrder(payload){
    return{
        type:'FILTER_BY_POPULATION_ORDER',
        payload,
    }
}
export function getByName(name){
    return async function (dispatch){
        try{
            let res = await axios.get(`http://localhost:3001/countries?name=${name}`);
            console.log("getcountries(name):",res.data)
            return dispatch({
                type: 'GET_BY_NAME',
                payload: res.data 
            });
        }catch(error){
            console.log(error);
            // return dispatch({
            //     type: 'GET_BY_NAME',
            //     payload: "No country"
            // })
        }
    }
};
export function getDetail(id){
    return async function (dispatch){
        try{
            const json = await axios.get(`http://localhost:3001/countries/${id}`);
            console.log("getDetail(id):",json.data)
            return dispatch({
                type:'GET_DETAIL',
                payload: json.data 
            });
        }catch(error){
            console.log(error)
        }
    }

};

export function createActivity(payload){
    return async function (dispatch){
        var json = await axios.post("http://localhost:3001/activities", payload);//quiero hacer el post del payload, el payload
        //es lo que me llega del front
        return dispatch({
            type: 'CREATE_ACTIVITY',
            payload: json
        })
    }
}


 

