const { Router } = require('express');
const axios = require ('axios');
const {Country, Activity} = require('../db');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const GetApiInfo = async () =>{
 const apiResponse = await axios.get("https://restcountries.com/v3/all");
 //hago un map para traerme solo lo que yo necesito traerme de la api
 const apidata = await apiResponse.data.map(el=> {
     return{
         id: el.cca3,
         name: el.name.common,
         flags: el.flags[0],
         continents: el.continents[0],
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
            model: Activity,
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


router.get('/countries', async (req, res) => {
	// /countries?name=anguilla
	const { name } = req.query;
	let countries;
	const countryDB = await Country.count();
	countries =
		countryDB === 0 ? await GetApiInfo() // asi que si la db esta vacia llamo a la api
			: await DBinfo(); // si no saco de la bd
	if (name) {
		console.log('este es el name', name);
		const byName = countries.filter((n) =>
			n.name.toLowerCase().includes(name.toLowerCase())
		);
		byName.length
			? res.status(200).send(byName)
			: res.status(404).json({ error: 'Country not found' });
	} else {
		res.status(200).send(countries);
	}
});





router.get('/countries/:id', async (req,res) => {
    const id = req.params.id
    const TotalCountries = await GetAllInfo()
    if(id){
        let countriesId = await TotalCountries.filter(el=> el.id = id)
        countriesId ?
        res.status(200).send(countriesId) :
        res.status(400).send('Country not found')
    }
})



//POST
router.post('/activity', async (req, res)=> {
    const {name, difficulty , duration, season, countries} = req.body; //todo lo que necesito de una act
   Activity.create({
       name: name,
       difficulty: difficulty,
       duration: duration,
       season: season,
   })
   .then((activity) =>{ 
       countries.forEach((country) => { //recorro countries y tomo countryid si existe agrego la actividad
           Country.findByPk(country.id).then((country)=>{
               if(country) activity.addCountry(country);
           });
       });
   })
   .catch((error) => {
       console.log(error);
   });
   res.status(200).json({msg:'Activity created!'});
});




router.get('/activities',  async (req,res)=>{
      
    try{
           const activities= await Activity.findAll();
            return res.status(200).send(activities)
         }catch(error){
             return res.status(400).send(error);
        }
    
})


module.exports = router;
