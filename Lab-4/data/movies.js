const mongoCollections = require('../config/mongoCollections');
const validation = require('../helpers');
const movies = mongoCollections.movies;
const {ObjectId} = require('mongodb');


const getMovieById = async (id) => {
  id = validation.checkId(id);
  const movieCollection = await movies();
  const movie = await movieCollection.findOne({_id: ObjectId(id)});
  if (!movie) throw 'No movie with that id';

  return movie;
};

const createMovie = async (title,   plot,  genres, rating, studio, director, castMembers,  dateReleased, runtime) => {
  if(!title)  throw 'You must provide a title'
  if (typeof title !== 'string')    throw 'Title must be a string';
  if (title.trim().length === 0)    throw 'Title cannot be an empty string or just spaces';
  title = title.trim()
  if(title.length < 2)               throw 'Title must of atleast 2 characters'
  if(!/^[A-Za-z0-9\s]+$/.test(title))  throw 'Title should only contain letters and numbers'

  if (!plot) throw 'You must provide a plot';
  if (typeof plot !== 'string')    throw 'Plot must be a string';
  if (plot.trim().length === 0)    throw 'Plot cannot be an empty string or just spaces';
  plot = plot.trim()

  if (!studio) throw 'You must provide a studio';
  if (typeof studio !== 'string')    throw 'Studio must be a string';
  if (studio.trim().length === 0)    throw 'Studio cannot be an empty string or just spaces';
  studio = studio.trim()
  if(studio.length < 5)   throw 'Studio name must have atleast 5 characters'
  if(!/^[A-Za-z\s.,-]+$/.test(studio)) throw 'Studio should only contain letters'

  if (!director) throw 'You must provide a director';
  if (typeof director !== 'string')    throw 'Director must be a string';
  if(director.trim().length === 0)    throw 'Director cannot be an empty string or just spaces';
  director = director.trim()
  
  temp = director.split(' ') 
  if(temp.length != 2)    throw 'Director name should be of format "First Name Surname Name"'
  if(temp[0].length < 3)  throw 'First name should have min 3 characters'
  if(temp[1].length < 3)  throw 'Last name should have min 3 characters'
  if(!/^[A-Za-z]+$/.test(temp[0])) throw 'Director name must have only characters'
  if(!/^[A-Za-z]+$/.test(temp[1])) throw 'Director name must have only characters'

  if (!rating) throw 'You must provide a rating';
  if (typeof rating !== 'string')    throw 'Rating must be a string';
  if (rating.trim().length === 0)    throw 'Rating cannot be an empty string or just spaces';
  rating = rating.trim()
  validratings = ['G', 'PG', 'PG-13', 'R', 'NC-17']
  cnt = 0;
  for (let i = 0; i < validratings.length; i++) {
    if(validratings[i] == rating){
      cnt++
    }
  }
  if(cnt == 0)  throw "Rating should be one of the following: ['G', 'PG', 'PG-13', 'R', 'NC-17']"

  if (!genres || !Array.isArray(genres))  throw 'You must provide an array of genres';
  if (genres.length === 0) throw 'You must supply at least one genre';
  for (i in genres) {
    if (typeof genres[i] !== 'string' || genres[i].trim().length === 0) {
      throw 'One or more genres is not a string or is an empty string';
    }
    genres[i] = genres[i].trim();
    if(!/^[A-Za-z\s]+$/.test(genres[i])) throw 'Genre must only contain characters'
    if(genres[i].length < 5)    throw 'Genre must have atleast 5 characters'
  }

  if (!castMembers || !Array.isArray(castMembers))  throw 'You must provide an array of castMembers';
  if (castMembers.length === 0) throw 'You must supply at least one cast member';
  for (i in castMembers) {
    if (typeof castMembers[i] !== 'string' || castMembers[i].trim().length === 0) {
      throw 'One or more castMembers is not a string or is an empty string';
    }
    if(!/^[A-Za-z\s]+$/.test(castMembers[i])) throw 'Castmember name must only characters'
    member = castMembers[i].split(' ') 
    if(member.length != 2)    throw 'Castmembers must have atleast 2 characters'
    castMembers[i] = castMembers[i].trim();
    if(member[0].length < 3)  throw 'Castmembers First name should have min 3 characters'
    if(member[1].length < 3)  throw 'Castmembers Last name should have min 3 characters'
  }

  if (!dateReleased) throw 'You must provide a date released';
  if (typeof dateReleased !== 'string') throw 'Date released must be a string';
  if (dateReleased.trim().length === 0) throw 'Date released cannot be an empty string or just spaces';
  if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateReleased)) throw   'Date must be in the format MM/DD/YYYY';
  dateReleased = dateReleased.trim()
  digits = dateReleased.split('/') 
  month = parseInt(digits[0])
  date = parseInt(digits[1])
  year = parseInt(digits[2])
  if(year < 1900 || year > 2024 ) throw 'Invalid year'
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

  if (!runtime) throw 'You must provide a runtime';
  if (typeof runtime !== 'string') throw 'Runtime must be a string';
  if (runtime.trim().length === 0) throw 'Runtime must be greater than 0';
  runtime = runtime.trim()
  time = runtime.split(' ')
  hour = time[0].split('h')
  min = time[1].split('min')
  hour = Number(hour[0])
  min = Number(min[0])
  if(hour <= 0)   throw 'Hour must not be zero or negetive hours'
  if(min > 59 || min < 0)   throw 'Minutes must be in range of 0-59'
  if(!Number.isInteger(hour))  throw 'Invalid hour entered'
  if(!Number.isInteger(min))  throw 'Invalid mins entered'

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
  };

  const movieCollection = await movies();
  const insertInfo = await movieCollection.insertOne(newMovie);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Could not add movie';
  const movie = await getMovieById(insertInfo.insertedId.toString());
  return movie;
};

const getAllMovies = async () => {
  const moviesCollection = await movies();
  const movieList = await moviesCollection.find({}).toArray();

  if (!movieList) throw 'No movies in database';

  return movieList;
};

const removeMovie = async (id) => {
  id = validation.checkId(id);

  const movieCollection = await movies();
  const deletionInfo = await movieCollection.deleteOne({_id: ObjectId(id)});

  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete movie with id of ${id} : Movie not present`;
  }
  return {deleted: true};
};

const renameMovie = async (id, newName) => {

  id = validation.checkId(id);
  newName = validation.checkString(newName, 'new movie name');

  const movieCollection = await movies();
  const updatedmovie = {
    title: newName,
  };

  const updatedInfo = await movieCollection.updateOne(
    {_id: ObjectId(id)},
    {$set: updatedmovie}
  );
  
  if (updatedInfo.modifiedCount === 0) {
    throw 'Could not update movie successfully: Movie not present';
  }
  return await getMovieById(id);
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  removeMovie,
  renameMovie,
};
