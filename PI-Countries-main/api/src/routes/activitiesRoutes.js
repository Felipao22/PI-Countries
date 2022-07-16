const { Router } = require('express');
const {Activities,Country} = require('../db')

const router = Router();

router.get('/', async (req, res) => {
    try {
        const activity = await Activities.findAll({
            attributes: ['id', 'name', 'dificulty', 'duration', 'season'],
            include: Country
        })
        res.status(200).send(activity)
    } catch (error) {
        console.log(error)
    } 
}); 


router.post('/', async (req, res) => {
    try {
        const { name, dificulty, duration, season, countries } = req.body;
        const createAct = await Activities.create({           
                name: name,
                dificulty: dificulty,
                duration: duration,
                season: season,
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