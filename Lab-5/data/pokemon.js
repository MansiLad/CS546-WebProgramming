//Your data modules to make the Axios calls and get the data
const axios = require('axios')
const validator = require('../helpers')

const pokemon = async () => {
    let {data} = await axios.get('https://pokeapi.co/api/v2/pokemon');
    return data.results;
};

const pokemonById = async (id) => {
    id = id.trim()
    const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const datafetched = await data
    if(datafetched == null) throw `Sorry, no Pokemon data available for id: ${id}`
    return data;
};

module.exports = {
    pokemon,
    pokemonById,
};