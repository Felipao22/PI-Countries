const { Router } = require('express');
// const { newActivity } = require('../controllers/activitiesControllers');
const {Activities,Country} = require('../db')

const router = Router();


router.post('/', async (req, res) => {
    const { idActivity, name, dificultad, duracion, temporada, id } = req.body;
    const newActivity = { name, dificultad, duracion, temporada};
    try {
        const activitySearch = await Activities.findOne({
            where: {
                name: name
            }
        })
        if(!activitySearch) {
            const createActivity = await Activities.create(newActivity)
            let inCountry = await Country.findAll({
                where: {
                    name: name
                }
            })
            await createActivity.addCountry(inCountry)
            res.status(200).send('Actividad creada');
        } 
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;