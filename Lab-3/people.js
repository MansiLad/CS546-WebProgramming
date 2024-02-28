const axios = require('axios')

async function getApiData() {
    try{
      let {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json');
      return data;
    } catch(e){
      console.log(e)
    }
}

const getPersonById = async (id) => {
    if(typeof id !== 'string')        throw "Error: String not passed"
    if(id.length === 0 || id.trim().length === 0)        throw "Error: Empty string passed"

    const data = await getApiData();
    for (let index = 0; index < data.length; index++) {
        if(data[index].id === id){
            return data[index]
        }
    }
    throw "Person not Found!"
};
  
const sameJobTitle = async (jobTitle) => {
    if(typeof jobTitle !== 'string')        throw "Error: String not passed"
    if(jobTitle.length === 0 || jobTitle.trim().length === 0)        throw "Error: Empty string passed"

    const data = await getApiData();
    var info = []
    for (let index = 0; index < data.length; index++) {
        if(data[index].job_title.toLowerCase() === jobTitle.toLowerCase()){
            info.push(data[index])
        }
    }

    if(info.length >= 2){
        return info
    }
    else{
        throw "Error since there are not two people with that job title"
    }
    
};

const getPostalCodes = async (city, state) => {
    if(city === undefined)  throw 'Error: City undefined'
    if(state === undefined)  throw 'Error: State undefined'
    if(city.length === 0 || city.trim().length === 0 || state.length === 0 || state.trim().length === 0)        throw "Error: Empty City/state string passed"
    if(typeof city !== 'string' || typeof state !== 'string')        throw "Error: City/State passed is not a string or is not passed"

    const data = await getApiData();
    var postalcodes = []
    for (let index = 0; index < data.length; index++) {
        if(data[index].city.toLowerCase() === city.toLowerCase() && data[index].state.toLowerCase() === state.toLowerCase()){
            postalcodes.push(Number(data[index].postal_code))
        }
    }
    if(postalcodes.length === 0)        throw "Error: There are no postal_codes for the given city and state combination "
    postalcodes = postalcodes.sort()
    return postalcodes

};

const sameCityAndState = async (city, state) => {
    if(city === undefined)  throw 'Error: undefined'
    if(typeof city !== 'string' || typeof state !== 'string')        throw "Error: City/State passed is not a string or is not passed"
    if(city.length === 0 || city.trim().length === 0 || state.length === 0 || state.trim().length === 0)        throw "Error: Empty City/state string passed"

    const data = await getApiData();
    var peopleliving = []
    var lastnames = []
    for (let index = 0; index < data.length; index++) {
        if(data[index].city.toLowerCase() === city.toLowerCase() && data[index].state.toLowerCase() === state.toLowerCase()){
            lastnames.push(data[index].last_name)
        }
    }
    lastnames = lastnames.sort()
    for(let j=0;j<lastnames.length;j++){
        for(let i=0;i<data.length;i++){
            if(lastnames[j] === data[i].last_name && data[i].city.toLowerCase() === city.toLowerCase() && data[i].state.toLowerCase() === state.toLowerCase()){
                fullname = data[i].first_name.concat(" ", data[i].last_name)
                peopleliving.push(fullname)
            }            
        }
    }

    if(peopleliving.length >= 2){
        return peopleliving
    }else{
        throw 'Error: there are not two people who live in the same city and state'
    }
};

module.exports = {
    getPersonById,
    sameJobTitle,
    getPostalCodes,
    sameCityAndState
};
