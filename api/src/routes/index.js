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
router.post('/activity', async (req, res)=> {
    
   const {name, difficulty , duration, season, countries} = req.body; //todo lo que necesito de una act
   Activity.create({
       name: name,
       difficulty: difficulty,
       duration: duration,
       season: season,
   })
   .then((activity) =>{ 
       countries?.forEach((country) => { //recorro countries y tomo countryid si existe agrego la actividad
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

// router.post('/activity', async (req, res)=> {
    
//     const {name, difficulty , duration, season, countries} = req.body; //todo lo que necesito de una act
//     const activities = await Activity.create({
//         name: name,
//         difficulty: difficulty,
//         duration: duration,
//         season: season,
        
//     })
//     console.log(activities)
//     try{
//         countries ?.map(async country =>{
//             let search = await Country.findAll({
//                 where: {id: country}
//             })
//             if(search){ //si hay paises agregalo a las act
//                 activities.addCountry(country)
//             }
//         })
//         res.send("Activity created")
//     }catch(e){
//         res.status(400).send("Sorry, there was an error in creating the activity" + e)
//     }
// })
// router.post('/activity', async (req,res)=>{
//     const {name, difficulty, duration, season, country} = req.body;
    
//     if(!name || !difficulty){
//         console.log(`Name: ${name}, Difficulty: ${difficulty}`);
//         return res.status(400).send('Name and difficulty required');
//     }

//     //saving activities in DB
//     let actCreated = await Activity.create({
//         name, difficulty, duration, season
//     })

//     //Aca establezco la relacion de la act con pais---
//     let dbCountry = await Country.findAll({
//         where: { name: country },
//     })
//     actCreated.addCountry(dbCountry);
//     ////////---------------------------

//     res.status(200).send('Activity succesfully created');

    
    
// });




router.get('/activity',  async (req,res)=>{
      
    try{
           const activities= await Activity.findAll();
            return res.status(200).send(activities)
         }catch(error){
             return res.status(400).send(error);
        }
    
})


module.exports = router;
