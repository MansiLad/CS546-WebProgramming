const mongoCollections = require('../config/mongoCollections');
const validation = require('../helpers');
const movies = mongoCollections.movies;
const {ObjectId} = require('mongodb');

const createMovie = async (
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {
  
  title = validation.checkmovieTitle(title)
  plot = validation.checkPlot(plot)
  director = validation.checkDirector(director)
  rating = validation.checkRating(rating) 
  genres = validation.checkGenres(genres)
  castMembers = validation.checkCastMembers(castMembers)
  dateReleased = validation.checkdateReleased(dateReleased)
  runtime = validation.checkRuntime(runtime)

  const newMovie = {
    title: title,
    plot: plot,
    genres: genres,
    rating: rating,
    studio: studio,
    director: director,
    castMembers: castMembers,
    dateReleased: dateReleased,
    runtime: runtime,
    reviews:[],
    overallRating: 0
  };

  const movieCollection = await movies();
  const insertInfo = await movieCollection.insertOne(newMovie);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Could not add movie';
  const movie = await getMovieById(insertInfo.insertedId.toString());
  return JSON.parse(JSON.stringify(movie));
};

const getAllMovies = async () => {
  const moviesCollection = await movies();
  const movieList = await moviesCollection.find({},{projection:{_id:1,title:1}}).toArray();

  //if (!movieList) throw 'No movies in database';
  //return movieList._id
  return JSON.parse(JSON.stringify(movieList));
  
};

const getMovieById = async (movieId) => {
  id = validation.checkId(movieId);
  const movieCollection = await movies();
  const movie = await movieCollection.findOne({_id: ObjectId(id)});
  if (!movie) throw 'No movie with that id';
  return JSON.parse(JSON.stringify(movie));
};

const removeMovie = async (movieId) => {
  id = validation.checkId(movieId);

  const movieCollection = await movies();

  let moviename = await getMovieById(id)
  const deletionInfo = await movieCollection.deleteOne({_id: ObjectId(id)});

  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete movie with id of ${id} : Movie not present`;
  }
  return `${moviename.title} is deleted successfully!`;
};

const updateMovie = async (
  movieId,
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {

  const movieCollection = await movies();

  movieid = validation.checkId(movieId)
  title = validation.checkmovieTitle(title)
  plot = validation.checkPlot(plot)
  director = validation.checkDirector(director)
  rating = validation.checkRating(rating) 
  genres = validation.checkGenres(genres)
  castMembers = validation.checkCastMembers(castMembers)
  dateReleased = validation.checkdateReleased(dateReleased)
  runtime = validation.checkRuntime(runtime)

  let movie = await getMovieById(movieid)
  if(!movie) throw "Error: No movie"

  let toUpdate = {
    title: title,
    plot: plot,
    genres: genres,
    rating: rating,  
    studio: studio,
    director: director,
    castMembers: castMembers,
    dateReleased: dateReleased,
    runtime: runtime,
  };

  const updatedInfo = await movieCollection.updateOne(
    { _id: ObjectId(movieid) },
    { $set: toUpdate }
  );

  if (updatedInfo.modifiedCount === 0) {
    throw 'Movie could not get updated';
  }
  const moviebyid = await movieCollection.findOne({_id: ObjectId(id)});
  return JSON.parse(JSON.stringify(moviebyid));
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  removeMovie,
  updateMovie,
};
