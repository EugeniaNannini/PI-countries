const { Router } = require('express');
const axios = require ('axios');
const {Country, Activity} = require('../db');
const { response } = require('express');
const { Op } = require ('sequelize');
const { reset } = require('nodemon');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/countries', async (req, res)=>{
    const name = req.query.name;
    try{
    if(!name){
        const countries = await Country.findAll({ //me piden algo general
            include: {model:Activity,
            attributes: ['name', 'difficulty', 'duration','season'] }
        })
        return res.send(countries)
    }else{
        const allcountries = await Country.findAll({ //me piden uno especifico
            where:{ 
                name: {[Op.iLike]:`${name}%`} // sjdksn argentina oehfsjdn

            }
        })
        allcountries ?
        res.send(allcountries) :
        res.status(400).send('Country not found')
        
    }
  }catch(error){
  res.send(error)
  }
  
    
})
    
    
    
    
    
    router.get('/countries/:id', async (req,res) => {
    const { id } = req.params;
    const getId = await Country.findByPk(id.toUpperCase(), 
        {include : Activity}
        
    )
    console.log(getId)
    getId ? res.send(getId) : res.send("id not found")

    })
    
         
   
     
  

  






//POST
// router.post('/activity', async (req, res)=> {
    
//    const {name, difficulty , duration, season, countries} = req.body; //todo lo que necesito de una act
//    Activity.create({
//        name: name,
//        difficulty: difficulty,
//        duration: duration,
//        season: season,
//    })
//    .then((activity) =>{ 
//        countries?.forEach((country) => { //recorro countries y tomo countryid si existe agrego la actividad
//            Country.findByPk(country.id).then((country)=>{
//                if(country) activity.addCountry(country);
//            });
//        });
//    })
//    .catch((error) => {
//        console.log(error);
//    });
//    res.status(200).json({msg:'Activity created!'});
// });

router.post('/activity', async (req, res)=> {
    
    const {name, difficulty , duration, season, countries} = req.body; //todo lo que necesito de una act
    const activities = await Activity.create({
        name: name,
        difficulty: difficulty,
        duration: duration,
        season: season,
        
    })
    console.log(activities)
    try{
        countries ?.map(async country =>{
            let search = await Country.findAll({
                where: {id: country}
            })
        })
        res.send("Activity created")
    }catch(e){
        res.status(400).send("Sorry, there was an error in creating the activity" + e)
    }
})




router.get('/activities',  async (req,res)=>{
      
    try{
           const activities= await Activity.findAll();
            return res.status(200).send(activities)
         }catch(error){
             return res.status(400).send(error);
        }
    
})


module.exports = router;
