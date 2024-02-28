//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/code/routes
const express = require('express');
const data = require('../data');
const pokemonData = data.pokemon;
const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    try {
      res.json(await pokemonData.pokemon())
    } catch (e) {
      res.status(404).json({error: "Sorry, no Pokemon data"})
    }
  });
//Request Method

router
  .route('/:id')
  .get(async (req, res) => {
    try{
      //req.params.id = validator.checkId(req.params.id);
      tempid = req.params.id;
      if (tempid == null || tempid == undefined || isNaN(tempid) || tempid % 1 != 0 || tempid < 0) {
        res.status(400).json({message: 'Invalid ID in URL'});
      }
      res.json(await pokemonData.pokemonById(req.params.id))
    } catch (e) {
      res.status(404).json({error: "Pokemon not found"});
    }
  }); 
//Request Method

module.exports = router;