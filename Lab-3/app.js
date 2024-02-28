const people = require("./people");
const company = require('./companies');

async function main(){
    //testing people.js
    //getPersonById
    // try{
    //     console.log(await people.getPersonById("7bb4bd85-9da0-426f-8765-5b0fbaef055c"));
    // }
    // catch(e){
    //     console.log(e)
    // } 
    // try{
    //     console.log(await people.getPersonById("0a0e068-4c15-4456-a747-c5105326d6dd"));
    // }
    // catch(e){
    //     console.log(e)
    // } 

    // //sameJobTitle
    // try{
    //     console.log(await people.sameJobTitle("Help Desk Operator")); 
    // }
    // catch(e){
    //     console.log(e)
    // } 
    // try{
    //     console.log(await people.sameJobTitle(" ")); 
    // }
    // catch(e){
    //     console.log(e)
    // } 

    // //getPostalCodes
    // try{
    //     console.log(await people.getPostalCodes("Oklahoma City", "OKLAHOMA"))
    // }
    // catch(e){
    //     console.log(e)
    // } 
    // try{
    //     console.log(await people.getPostalCodes("SALT LAKE CITY",))
    // }
    // catch(e){
    //     console.log(e)
    // } 

    // //sameCityAndState
    // try{
    //     console.log(await people.sameCityAndState("Miami", "Florida"))
    // }
    // catch(e){
    //     console.log(e)
    // } 

    try{
        console.log(await people.sameCityAndState('wAsHiNgToN', 'district Of COLUMBIA'))
    }
    catch(e){
        console.log(e)
    } 


    // //testing company.js
    // //listEmployees
    // try{
    //     console.log(await company.listEmployees("Conroy Inc"))
    // }
    // catch(e){
    //     console.log(e)
    // }  
    // try{
    //     console.log(await company.listEmployees("SPINKA-o'kOn"))
    // }
    // catch(e){
    //     console.log(e)
    // }  

    // //sameIndustry
    // try{
    //     console.log(await company.sameIndustry('Auto Parts:O.E.M.'))
    // }
    // catch(e){
    //     console.log(e)
    // }  
    // try{
    //     console.log(await company.sameIndustry('COMPUTER software: PrEpAcKaGeD sOfTwArE'))
    // }
    // catch(e){
    //     console.log(e)
    // }  

    // //getCompanyById
    // try{
    //     console.log(await company.getCompanyById("fb90892a-f7b9-4687-b497-d3b4606faddf"))
    // }
    // catch(e){
    //     console.log(e)
    // }  
    // try{
    //     console.log(await company.getCompanyById('7989fa5e-5617-43f7-a931-46036f9dbcff'))
    // }
    // catch(e){
    //     console.log(e)
    // }      

}

main();
