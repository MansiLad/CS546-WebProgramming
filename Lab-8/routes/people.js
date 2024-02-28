//Require express and express router as shown in lecture code and worked in previous labs
const express = require('express')
const router = express.Router();
const path = require("path")
const data = require("../data/people")


router.route("/").get(async (req, res) => {
  //code here for GET
  res.sendFile(path.resolve("static/homepage.html"))
});

router.route("/searchpeople").post(async (req, res) => {
  //code here for POST
  let name = req.body.name
  name = name.trim()
  if(name.length == 0){
    res.status(400).render('../views/error', {title:'Error in input', Error:'Enter a name and not spaces' })
  }
  let person = await data.searchPeopleByName(name)
  if(person == null){
    return res.render('../views/personNotFound', {searchPersonName: name, title:' Not Found', Error: "We're sorry, but no results were found for "+ name })
  }

  return res.render("../views/peopleFound", {id: person.id, searchPersonName: name, result: person, title: 'People Found'})

});

router.route("/persondetails/:id").get(async (req, res) => {
  //code here for GET
  if(isNaN(req.params.id)){
    return res.status(400).render('../views/error', {title: 'Invalid ID', Error: "Id should be a number"})
  }

  const person = await data.searchPeopleByID(req.params.id)
  if(person === null || person === undefined){
    return res.status(400).render('../views/error', {title: 'Not found', Error: "No ID exist"})
  }
  let name = person.firstName + " " + person.lastName;
  res.render("../views/personFoundByID", {title: 'Person Found', id: person.id, fullname:name , fname: person.firstName, lname: person.lastName, add:person.address, zip:person.zip, phone:person.phone, ssn:person.ssn});

});


module.exports= router;