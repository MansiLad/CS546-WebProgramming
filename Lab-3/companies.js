const axios = require('axios')

async function getCompanyData() {
    try{
        let {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json');
        return data;
    } catch(e){
        console.log(e)
    }
  }

async function getPeopleData() {
    try{
        let {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json');
        return data;
    } catch(e){
        console.log(e)
    }
  }

const listEmployees = async (companyName) => {
  if(companyName === undefined)  throw 'Error: companyName undefined'
  if(typeof companyName !== 'string')        throw "Error: companyName passed is not a string or is not passed"
  if(companyName.length === 0 || companyName.trim().length === 0 )        throw "Error: Empty companyName string passed"

  const companydata = await getCompanyData();
  const peopledata = await getPeopleData();
  var employees = []
  var lastnames = []
  for(let i=0; i<companydata.length; i++){
    if(companydata[i].name.toLowerCase() === companyName.toLowerCase()){
      for(let j=0; j<peopledata.length; j++){ 
        if(companydata[i].id === peopledata[j].company_id){
          lastnames.push(peopledata[j].last_name)
        }
      }

      if(lastnames.length !== 0) {
        lastnames = lastnames.sort()
        for(let j=0;j<lastnames.length;j++){
          for(let i=0;i<peopledata.length;i++){
            if(lastnames[j] === peopledata[i].last_name){
              fullname = peopledata[i].first_name.concat(" ", peopledata[i].last_name)
              employees.push(fullname)
            }            
          }
        }       
      }
      companydata[i]['employees'] = employees
      return companydata[i]
    }
  }   
  throw "Error: Company name not found"
};

const sameIndustry = async (industry) => {
  if(industry === undefined)              throw 'Error: undefined'
  if(typeof industry !== 'string')        throw "Error: industry passed is not a string or is not passed"
  if(industry.length === 0 || industry.trim().length === 0)        throw "Error: Empty industry string passed"
    
  const companydata = await getCompanyData();
  var sameindustry = [];

  for(let i=0;i<companydata.length;i++){
    if(companydata[i].industry.toLowerCase() === industry.toLowerCase()){
      sameindustry.push(companydata[i])
    }
  }
  if(sameindustry.length === 0){
    throw 'No companies in that industry'
  }else {
    return sameindustry;
  }
};

const getCompanyById = async (id) => {
  if(id === undefined)              throw 'Error: undefined'
  if(typeof id !== 'string')        throw "Error: id passed is not a string or is not passed"
  if(id.length === 0 || id.trim().length === 0)        throw "Error: Empty id string passed"

  const companydata = await getCompanyData();
  for(let i=0;i<companydata.length;i++){
    if(companydata[i].id === id){
      return companydata[i]
    }
  }
  throw "Error: company not found" 
};

module.exports = {
  listEmployees,
  sameIndustry,
  getCompanyById
};
