const axios = require ('axios');
const {Country} = require ('./src/db');


const getCountries = async() => {
    const api = await axios.get("https://restcountries.com/v3/all");
    console.log(api)
    const apiInfo = await api.data.map(e => {
    Country.findOrCreate({
        where:{
        id: e.cca3,
        name: e.name['common'],
        flag: e.flags[0],
        continents: e.continents[0],
        capital: e.capital ? e.capital[0] : "Capital not found",
        subregion: e.subregion ? e.subregion [0] : "Subregion not found",
        area: e.area,
        population: e.population
    }});
});


}

module.exports = {getCountries};