const { Router } = require('express');
const axios = require ('axios');
const {Country, TuristActivity} = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const GetApiInfo = async () =>{
 const apiResponse = await axios.get(`https://restcountries.com/v3/all`);
 //hago un map para traerme solo lo que yo necesito traerme de la api
 const apidata = await apiResponse.data.map(el=> {
     return{
         id: el.cca3,
         name: el.name,
         flags: el.flags[0],
         continent: el.continents[0],
         capital: el.capital ? el.capital[0] : "Capital not found",
         //probar haciendo el.capital,map(el=>el) -->da un arreglo como rdo
         subregion: el.subregion ? el.subregion[0] : "Subregion not found",
         area: el.area,
         population: el.population

     };
 });
 return apidata;
}

const DBinfo = async() =>{
    //me traigo la info de la base de datos
    return await Country.findAll({
        include: {
            model: TuristActivity,
            attributes: ['name', 'difficulty', 'duration','season'],
            through:{
                attributes:[],
            },
        },
    });
};
const GetAllInfo = async () =>{
    const apiInfo = await GetApiInfo();
    const Dbinfo = await DBinfo();
    const InfoTotal = apiInfo.concat(Dbinfo);
    return InfoTotal;

}

router.get('/countries', async (req,res) =>{
    const name = req.query.name
    let allCountries = await GetAllInfo();
    if(name){
        let countryName = await allCountries.filter(el=> el.name.toLowerCase().includes(name.toLowerCase()))
        countryName ?
        res.status(200).send(countryName) :
        res.status(400).send('Sorry, country not found')
    }else{
        res.status(200).send(allCountries)
    }
})

router.get('/countries/:id', async (req,res) =>{
    const id = req.params.id
    const TotalCountries = await GetAllInfo()
    if(id){
        let countriesId = await TotalCountries.filter(el=> el.id = id)
        countriesId ?
        res.status(200).send(countriesId) :
        res.status(400).send('Country not found')
    }
})
 router.post('/activity', async (req,res) => {
     let{name, 
        difficulty, 
        duration, 
        season, 
        country} = req.body
     let TuristactivityCreated = await TuristActivity.create({
         name, difficulty, duration, season})
    
    if(country){
        await TuristactivityCreated.addCountries(country);
        
    }
    return res.status(200).send('Activity created!')
    
 });


module.exports = router;
