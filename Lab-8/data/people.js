//Axios call to get all data
const axios = require('axios');
const data = require('.');

const getAllPeople = async () => {
    const people = await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json')
    return people.data;
};

//Function to list of up to 20 people matching the searchPersonName (sorted by id)
const searchPeopleByName = async (searchPersonName) => {

    if(searchPersonName.length == undefined || searchPersonName.length == null){
        res.render('../views/error', {class:'error', message:'Enter a valid name'})
    }

    searchPersonName = searchPersonName.trim()
    searchPersonName = searchPersonName.toLowerCase()
    searchPersonName = searchPersonName.split(" ").join("")

    const people = await getAllPeople();
    
    if(searchPersonName.length == 0){
        res.render('../views/error', {class:'error', message:'Empty name passed, enter a valid name'})
    }
    
    let cnt = 0
    let result = []
    for (let i = 0; i < people.length; i++) {

        fullName = `${people[i].firstName} ${people[i].lastName}`.toLowerCase();
        fullName = fullName.split(" ").join("")
      
        if(fullName.includes(searchPersonName)){
           
            result.push(people[i])
            cnt++
        }

        if(cnt==20){
            i=data.length;
        }
    }
    if(result.length <= 0){
        return null
    }
    return result
};

//Function to list person matching the id
const searchPeopleByID = async (id) => {
   
    const people = await getAllPeople();
    if(id > people.length || id < 0 || id === null){
        return null
    }  
    for (person = 0; person<people.length; person++) {
        if(Number(people[person].id) === Number(id)){
            return people[person]
        }
    }
};

module.exports = { searchPeopleByName, searchPeopleByID };
