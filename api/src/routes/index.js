const { Router } = require('express');
const axios = require ('axios');
const {Country, Activity} = require('../db');
const { Op } = require ('sequelize');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/countries', async (req, res)=>{

    const name = req.query.name;  
    try{
        if(name){
            const countries = await Country.findAll({
                where: {
                    name:  {[Op.iLike]:`${name}%`} 
                }

            })
            countries.length? 
            res.status(200).send(countries) :
            res.status(400).send('Not found')
        }else{
            const allcountries = await Country.findAll({
                include: {model:Activity,
                 attributes: ['name', 'difficulty', 'duration','season'] }
            })
            return res.status(200).send(allcountries)
            
        }
    } catch(error){
        console.log(error)
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

router.post("/activity", async (req,res) => {
    try {
        const { name, difficulty, duration, season, countries } = req.body 
        const act = await Activity.create({ name, difficulty, duration, season, }) 
        countries.map((e) => act.addCountry(e))
        res.send(act)
    } catch (err) {
        res.send(err)
    }


})  






router.get('/activity',  async (req,res)=>{
      
    try{
           const activities = await Activity.findAll({})
            return res.status(200).send(activities)
         }catch(error){
             return res.status(400).send(error);
        }
    
})

router.get('/filter/:continent', async (req,res)=>{
    const{continent} = req.params
    try{
        const continentFilter = await Country.findAll({
            where:{
                continents:continent
            }
        })
        continentFilter.length?
        res.status(200).send(continentFilter) :
        res.status(404).send('not found')
    }catch(error){
        console.log(error)
    }
})
 
// router.get('/countries/ordenamiento/:order', async (req,res) => {
//     const {order} = req.params;
//     try{
//     const countriesOrdered = await Country.findAll({
//         order: [["name" , order]]
//     })
//     if(countriesOrdered.length){
//         return res.status(200).send(countriesOrdered)
//     }else{
//         return res.status(400).send('error')
//     }
// }catch(error){
//     console.log(error)
// }

// })






module.exports = router;
