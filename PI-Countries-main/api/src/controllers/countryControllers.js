const axios = require ('axios');
const { Country, Activities } = require('../db');


//countries de la api
async function getCountriesDb(req, res){
    try {
        const apiInfoCountry = await axios.get('https://restcountries.com/v3/all')
        const apiInfoCountries = apiInfoCountry.data.map(c => {
            return {
                name: c.name.common,
                id: c.cca3,
                flags: c.flags? c.flags[0]: 'No tiene Imagen',
                capital: c.capital? c.capital[0]: 'No tiene Capital',
                continents: c.region ? c.region : 'No tiene Region',
                subregion: c.subregion?c.subregion : 'No tiene SubRegion',
                area: parseInt(c.area)? parseInt(c.area) : 0,
                population: parseInt(c.population)
            };
        });
        apiInfoCountries.forEach(c => {
            Country.findOrCreate({
                where: {
                    name: c.name,
                    id: c.id,
                    flags: c.flags,
                    capital: c.capital,
                    continents: c.continents,
                    subregion: c.subregion,
                    area: c.area,
                    population: c.population   
                }
            })
        })
        console.log('Database loaded');
    } catch (error) {
        console.log(error);
    }
}


const getAllCountry = async () => {
    // await getCountriesDb();
     return await Country.findAll({
        include:{
            model: Activities,
            attributes: ['name', 'difficulty','duration','season'],
            through:{
                attributes:[]
            }
        }
     });

};


module.exports = {
    getCountriesDb,
    getAllCountry
}