//require express and express router as shown in lecture code
const { ObjectId } = require("mongodb");
const express = require('express');
const router = express.Router();
const data = require('../data');
const movieData = data.movies;
const validation = require('../helpers');

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    try{
      let movieList = await movieData.getAllMovies();
      let element = {};
      let final = []
      for(let index=0; index<movieList.length; index++){
        element[index] = {_id: movieList[index]._id , title: movieList[index].title}
        final.push(element[index]);
      }
      res.status(200).json(final)
    }catch(e){
      res.status(500).json({ error: 'Could not get movies' });
    }
  })
  .post(async (req, res) => {
    //code here for POST
    let movieinfo = req.body;

    if(!movieinfo){
      res.status(400).json({error: "Provide data to insert movie"})
      throw "Data not provided to create movie"
    }


    if(!movieinfo.title){
      res.status(400).json({error: "Provide name of movie"})
      throw "Movie name not provided"
    }
    if(typeof movieinfo.title != 'string'){
      res.status(400).json({error: "provide name of movie as string"})
      throw "Movie name should be a string"
    }
    if(movieinfo.title.trim().length === 0){
      res.status(400).json({error: "Provide name of movie"})
      throw 'Title cannot be an empty string or just spaces';
    }    
    movieinfo.title = movieinfo.title.trim()


    if(!movieinfo.plot){
      res.status(400).json({error: "Provide plot of movie"})
      throw "Movie plot not provided"
    }
    if(typeof movieinfo.plot != 'string'){
      res.status(400).json({error: "provide plot of movie as string"})
      throw "Movie plot should be a string"
    }
    if (movieinfo.plot.trim().length === 0){
      res.status(400).json({error: "Provide plot of movie"})
      throw 'Plot cannot be an empty string or just spaces';
    }   
    movieinfo.plot = movieinfo.plot.trim()


    if(!movieinfo.studio){
      res.status(400).json({error: "Provide studio of movie"})
      throw "Movie studio not provided"
    }
    if(typeof movieinfo.studio != 'string'){
      res.status(400).json({error: "provide studio of movie as string"})
      throw "Movie studio should be a string"
    }
    if(movieinfo.studio.trim().length === 0){
      res.status(400).json({error: "Provide studio of movie"})
      throw 'studio cannot be an empty string or just spaces';
    }   
    movieinfo.studio = movieinfo.studio.trim()

    
    if(!movieinfo.director){
      res.status(400).json({error: "Provide director of movie"})
      throw "Movie director not provided"
    }
    if(typeof movieinfo.director != 'string'){
      res.status(400).json({error: "provide director of movie as string"})
      throw "Movie director should be a string"
    }
    if (movieinfo.director.trim().length === 0){
      res.status(400).json({error: "Provide director of movie"})
      throw 'director cannot be an empty string or just spaces';
    }   
    movieinfo.director = movieinfo.director.trim()


    if(!movieinfo.rating){
      res.status(400).json({error: "Provide rating of movie"})
      throw "Movie rating not provided"
    }
    if(typeof movieinfo.rating != 'string'){
      res.status(400).json({error: "provide rating of movie as string"})
      throw "Movie rating should be a string"
    }
    if (movieinfo.rating.trim().length === 0){
      res.status(400).json({error: "Provide rating of movie"})
      throw 'rating cannot be an empty string or just spaces';
    }   
    movieinfo.rating = movieinfo.rating.trim()


    if(!movieinfo.genres){
      res.status(400).json({error: "Provide genres of movie"})
      throw "Movie genres not provided"
    }
    if(!Array.isArray(movieinfo.genres)){
      res.status(400).json({error: "Provide genres of movie"})
      throw "Movie genres not provided"
    }
    if(movieinfo.genres.length === 0){
      res.status(400).json({error: "Provide genres of movie"})
      throw "Movie genres not provided"
    }
    for (let i = 0; i < movieinfo.genres.length; i++) {
      if (typeof movieinfo.genres[i]!='string') {
        throw "Movie genres must be a string"
      }
    }


    if(!movieinfo.castMembers){
      res.status(400).json({error: "Provide castMembers of movie"})
      throw "Movie castMembers not provided"
    }
    if(!Array.isArray(movieinfo.castMembers)){
      res.status(400).json({error: "Provide castMembers of movie"})
      throw "Movie castMembers not provided"
    }
    if(movieinfo.castMembers.length === 0){
      res.status(400).json({error: "Provide castMembers of movie"})
      throw "Movie castMembers not provided"
    }
    for (let i = 0; i < movieinfo.castMembers.length; i++) {
      if (typeof movieinfo.castMembers[i]!='string') {
        throw "Movie castMembers must be a string"
      }
    }


    if(!movieinfo.dateReleased){
      res.status(400).json({error: "Provide dateReleased of movie"})
      throw "Movie dateReleased not provided"
    }
    if(typeof movieinfo.dateReleased != 'string'){
      res.status(400).json({error: "provide dateReleased of movie as string"})
      throw "Movie dateReleased should be a string"
    }
    if(movieinfo.dateReleased.trim().length === 0){
      res.status(400).json({error: "Provide dateReleased of movie"})
      throw 'dateReleased cannot be an empty string or just spaces';
    }   
    movieinfo.dateReleased = movieinfo.dateReleased.trim()
    digits = movieinfo.dateReleased.split('/') 
    month = parseInt(digits[0])
    date = parseInt(digits[1])
    year = parseInt(digits[2])

    curr_year = new Date().getFullYear();
    final_year = curr_year + 2

    if(year < 1900 || year > final_year ) throw 'Invalid year'
    if(month > 12 || month < 0) throw 'Invalid month'
    if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12){
      if(date > 31 || date < 0) throw 'Invalid date'
    }
    if(month == 4 || month == 6 || month == 9 || month == 11){
      if(date > 30 || date < 0) throw 'Invalid date'
    }
    if(month == 2){
      if(date > 28 || date < 0) throw 'Invalid date'
    }


    if(!movieinfo.runtime){
      res.status(400).json({error: "Provide runtime of movie"})
      throw "Movie runtime not provided"
    }
    if(typeof movieinfo.runtime != 'string'){
      res.status(400).json({error: "provide runtime of movie as string"})
      throw "Movie runtime should be a string"
    }
    if(movieinfo.runtime.trim().length === 0){
      res.status(400).json({error: "Provide runtime of movie"})
      throw 'runtime cannot be an empty string or just spaces';
    }   
    runtime = movieinfo.runtime.trim()
    console.log(runtime)
    time = runtime.split(' ')
    console.log(time)
    hour = time[0].split('h')
    min = time[1].split('min')
    hour = Number(hour[0])
    min = Number(min[0])
    if(hour <= 0)   throw 'Hour must not be zero or negetive hours'
    if(min > 59 || min < 0)   throw 'Minutes must be in range of 0-59'
    if(!Number.isInteger(hour))  throw 'Invalid hour entered'
    if(!Number.isInteger(min))  throw 'Invalid mins entered'

    try {
      const newMovie = await movieData.createMovie(
      movieinfo.title, 
      movieinfo.plot, 
      movieinfo.genres, 
      movieinfo.rating, 
      movieinfo.studio, 
      movieinfo.director, 
      movieinfo.castMembers, 
      movieinfo.dateReleased, 
      movieinfo.runtime      
      );
      res.status(200).json(newMovie);
    }catch(e){
      res.status(400).json({error: e})
    }
  });

router
  .route('/:movieId')
  .get(async (req, res) => {
    //code here for GET
    try {
      req.params.movieId = validation.checkId(req.params.movieId)
    } catch(e) {
      return res.status(400).json({error: e})
    }
    try{
      const movie = await movieData.getMovieById(req.params.movieId)
      res.status(200).json(movie)
    } catch(e) {
      res.status(404).json({error:'Movie not found'})
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try{
      req.params.movieId = validation.checkId(req.params.movieId)
    }catch(e) {
      return res.status(400).json({error: e})
    }
    // try{
    //   const movie = await movieData.getMovieById(req.params.movieId)
    //   res.status(200).json(movie)
    // } catch(e) {
    //   res.status(404).json({error:'Movie not found'})
    // }
    try {
      await movieData.removeMovie(req.params.movieId);
      res.status(200).json({deleted: true});
    } catch (e) {
      res.status(400).json({error: e});
    }
  })
  .put(async (req, res) => {
    //code here for PUT
    let movieinfo = req.body;
    if(!movieinfo){
      res.status(400).json({error: "Provide data to insert movie"})
      throw "Data not provided to create movie"
    }

    req.params.movieId = validation.checkId(req.params.movieId)
    if(!movieinfo.title){
      res.status(400).json({error: "Provide name of movie"})
      throw "Movie name not provided"
    }
    if(typeof movieinfo.title != 'string'){
      res.status(400).json({error: "provide name of movie as string"})
      throw "Movie name should be a string"
    }
    if(movieinfo.title.trim().length === 0){
      res.status(400).json({error: "Provide name of movie"})
      throw 'Title cannot be an empty string or just spaces';
    }    
    movieinfo.title = movieinfo.title.trim()


    if(!movieinfo.plot){
      res.status(400).json({error: "Provide plot of movie"})
      throw "Movie plot not provided"
    }
    if(typeof movieinfo.plot != 'string'){
      res.status(400).json({error: "provide plot of movie as string"})
      throw "Movie plot should be a string"
    }
    if (movieinfo.plot.trim().length === 0){
      res.status(400).json({error: "Provide plot of movie"})
      throw 'Plot cannot be an empty string or just spaces';
    }   
    movieinfo.plot = movieinfo.plot.trim()


    if(!movieinfo.studio){
      res.status(400).json({error: "Provide studio of movie"})
      throw "Movie studio not provided"
    }
    if(typeof movieinfo.studio != 'string'){
      res.status(400).json({error: "provide studio of movie as string"})
      throw "Movie studio should be a string"
    }
    if(movieinfo.studio.trim().length === 0){
      res.status(400).json({error: "Provide studio of movie"})
      throw 'studio cannot be an empty string or just spaces';
    }   
    movieinfo.studio = movieinfo.studio.trim()

    
    if(!movieinfo.director){
      res.status(400).json({error: "Provide director of movie"})
      throw "Movie director not provided"
    }
    if(typeof movieinfo.director != 'string'){
      res.status(400).json({error: "provide director of movie as string"})
      throw "Movie director should be a string"
    }
    if (movieinfo.director.trim().length === 0){
      res.status(400).json({error: "Provide director of movie"})
      throw 'director cannot be an empty string or just spaces';
    }   
    movieinfo.director = movieinfo.director.trim()


    if(!movieinfo.rating){
      res.status(400).json({error: "Provide rating of movie"})
      throw "Movie rating not provided"
    }
    if(typeof movieinfo.rating != 'string'){
      res.status(400).json({error: "provide rating of movie as string"})
      throw "Movie rating should be a string"
    }
    if (movieinfo.rating.trim().length === 0){
      res.status(400).json({error: "Provide rating of movie"})
      throw 'rating cannot be an empty string or just spaces';
    }   
    movieinfo.rating = movieinfo.rating.trim()


    if(!movieinfo.genres){
      res.status(400).json({error: "Provide genres of movie"})
      throw "Movie genres not provided"
    }
    if(!Array.isArray(movieinfo.genres)){
      res.status(400).json({error: "Provide genres of movie"})
      throw "Movie genres not provided"
    }
    if(movieinfo.genres.length === 0){
      res.status(400).json({error: "Provide genres of movie"})
      throw "Movie genres not provided"
    }
    for (let i = 0; i < movie_post_data.genres.length; i++) {
      if (typeof movie_post_data.genres[i]!='string') {
        throw "Movie genres must be a string"
      }
    }


    if(!movieinfo.castMembers){
      res.status(400).json({error: "Provide castMembers of movie"})
      throw "Movie castMembers not provided"
    }
    if(!Array.isArray(movieinfo.castMembers)){
      res.status(400).json({error: "Provide castMembers of movie"})
      throw "Movie castMembers not provided"
    }
    if(movieinfo.castMembers.length === 0){
      res.status(400).json({error: "Provide castMembers of movie"})
      throw "Movie castMembers not provided"
    }
    for (let i = 0; i < movie_post_data.castMembers.length; i++) {
      if (typeof movie_post_data.castMembers[i]!='string') {
        throw "Movie castMembers must be a string"
      }
    }


    if(!movieinfo.dateReleased){
      res.status(400).json({error: "Provide dateReleased of movie"})
      throw "Movie dateReleased not provided"
    }
    if(typeof movieinfo.dateReleased != 'string'){
      res.status(400).json({error: "provide dateReleased of movie as string"})
      throw "Movie dateReleased should be a string"
    }
    if(movieinfo.dateReleased.trim().length === 0){
      res.status(400).json({error: "Provide dateReleased of movie"})
      throw 'dateReleased cannot be an empty string or just spaces';
    }   
    movieinfo.dateReleased = movieinfo.dateReleased.trim()
    digits = movieinfo.dateReleased.split('/') 
    month = parseInt(digits[0])
    date = parseInt(digits[1])
    year = parseInt(digits[2])

    curr_year = new Date().getFullYear();
    final_year = curr_year + 2

    if(year < 1900 || year > final_year ) throw 'Invalid year'
    if(month > 12 || month < 0) throw 'Invalid month'
    if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12){
      if(date > 31 || date < 0) throw 'Invalid date'
    }
    if(month == 4 || month == 6 || month == 9 || month == 11){
      if(date > 30 || date < 0) throw 'Invalid date'
    }
    if(month == 2){
      if(date > 28 || date < 0) throw 'Invalid date'
    }


    if(!movieinfo.runtime){
      res.status(400).json({error: "Provide runtime of movie"})
      throw "Movie runtime not provided"
    }
    if(typeof movieinfo.runtime != 'string'){
      res.status(400).json({error: "provide runtime of movie as string"})
      throw "Movie runtime should be a string"
    }
    if(movieinfo.runtime.trim().length === 0){
      res.status(400).json({error: "Provide runtime of movie"})
      throw 'runtime cannot be an empty string or just spaces';
    }   
    movieinfo.runtime = movieinfo.runtime.trim()
    time = movieinfo.runtime.split(' ')
    hour = time[0].split('h')
    min = time[1].split('min')
    hour = Number(hour[0])
    min = Number(min[0])
    if(hour <= 0)   throw 'Hour must not be zero or negetive hours'
    if(min > 59 || min < 0)   throw 'Minutes must be in range of 0-59'
    if(!Number.isInteger(hour))  throw 'Invalid hour entered'
    if(!Number.isInteger(min))  throw 'Invalid mins entered'

    try{
      let updateMovie = await movieData.updateMovie(
      req.params.movieId,
      movieinfo.title, 
      movieinfo.plot, 
      movieinfo.genres, 
      movieinfo.rating, 
      movieinfo.studio, 
      movieinfo.director, 
      movieinfo.castMembers, 
      movieinfo.dateReleased, 
      movieinfo.runtime
    )
    res.status(200).json(update_movie)
    }catch(e){
      res.status(400).json({error: 'Put function not working'})
    }
  });

module.exports = router;