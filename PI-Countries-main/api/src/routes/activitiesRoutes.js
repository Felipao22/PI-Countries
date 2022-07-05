const { Router } = require('express');
const {Activities,Country} = require('../db')

const router = Router();

router.get('/', async (req, res) => {
    try {
        const activity = await Activities.findAll({
            attributes: ['id', 'name', 'dificultad', 'duracion', 'temporada'],
            include: Country
        })
        res.status(200).send(activity)
    } catch (error) {
        console.log(error)
    } 
}); 


router.post('/', async (req, res) => {
    try {
        const { name, dificultad, duracion, temporada, countries } = req.body;
        const createAct = await Activities.create({           
                name: name,
                dificultad: dificultad,
                duracion: duracion,
                temporada: temporada,
        })
        let actADb = await Country.findAll({
                where:{name: countries}
        })
        createAct.addCountry(actADb)
        res.status(200).send('Actividad creada');

    } catch (error) {
        console.log(error);
    }
});


module.exports = router;