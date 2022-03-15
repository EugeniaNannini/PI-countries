const { Router } = require('express');
const axios = require ('axios');
const {Country, Activity} = require('../db');
const { response } = require('express');
const { Op } = require ('sequelize');


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
        {include : {model : Activity}}
        
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
//    .then((activity) =>{ //traigo act pasada por body
//        countries?.forEach((countries) => { //recorro countries y  me fijo si el country pasado en la creacion
//         //esta y tomo countryid si existe agrego la actividad
//            Country.findByPk(countries.id).then((countries)=>{ //busca en el modelo country por id y si lo encuentra lo agrega
//                if(countries) activity.addCountries(countries);
//            });
//        });
//    })
//    .catch((error) => {
//        console.log(error);
//    });
//    res.status(200).json({msg:'Activity created!'});
// });
//        ESTA ANDA OK --------------
// router.post('/activity', async (req,res)=>{
//     let {name, difficulty , duration, season, countries} = req.body;
//     const createActivity = await Activity.create({
//         name,
//         difficulty,
//         duration,
//         season,
//     })
//     if(countries){
//         await createActivity.addCountries(countries);
//     }
//     return res.status(200).json({msg:'Activity created!'})
// })
router.post("/activity", async (req,res) => {
    try {
        const { name, difficulty, duration, season, countries } = req.body
        const act = await Activity.create({ name, difficulty, duration, season, })
        countries.map((e) => act.addCountry(e))
        res.send(act)
    } catch (err) {
        res.send(err)
    }

    // try{
    // const {name, difficulty, season, duration, countries} = req.body;
    // console.log('estos son los countries', countries)
    // let newTourActivity = await Activity.create({name, difficulty, duration, season, })

    // countries.map((el) => {
    // return newTourActivity.addCountry(el)
        
    // })
    
    // res.status(200).send('activity created') 
    // }catch(error){
    //     res.send(error)
    // }
})  



// for(let elements of array de nombres){
//     findOne({aqui el where para buscar})
//     actividades.addpaises(elemtn)
// }


// router.get('/activity',  async (req,res)=>{
//     return await Activity.findAll({
// 		include: {
// 			model: Country,
// 			attribute: ['name:', 'flag', 'continents', 'capital'],
// 			through: {
// 				attributes: [],
// 			},
// 		},
// 	});
// })


router.get('/activity',  async (req,res)=>{
      
    try{
           const activities = await Activity.findAll({})
            return res.status(200).send(activities)
         }catch(error){
             return res.status(400).send(error);
        }
    
})


module.exports = router;
