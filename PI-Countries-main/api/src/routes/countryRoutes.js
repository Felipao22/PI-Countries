const { Router } = require('express');
const { getAllCountry } = require('../controllers/countryControllers');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get('/', async (req, res) =>{                                                                            
    const {name} = req.query;

    if(!name){                                                                  
        let countries = await getAllCountry();                                        
        return res.status(200).send(countries);
    }else{
        try{
            const country = await getAllCountry();                                     
            const nameCountry = country.filter(c => c.name.toLowerCase().startsWith(name.toLowerCase()));       
            nameCountry.length ?
            res.status(200).send(nameCountry) : res.status(404).send('Country name does not exist!');                                                   
        }
        catch(error){
         res.send(error)
        }; 
    };
});


router.get('/:id', async  (req, res) =>{                                             
    let {id} = req.params;                                                              
    try{
        let allId = await getAllCountry();                                                   
        let countryId = allId.filter( c => c.id.toUpperCase().startsWith(id.toUpperCase()))
        countryId ?
        res.status(200).send(countryId)
        : res.status(404).send('No existe Id del Pais')
    }
    catch(error){
        res.send(error)
    }
});




module.exports = router;