//here is where you'll set up your server as shown in lecture code.

//here is where you'll set up your server as shown in lecture code.
const express = require('express');
const app = express();
const configRoutes = require('./routes');

app.use(express.json());

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
 

/*
const connection = require('./config/mongoConnection');
const data = require('./data/')
const movies = data.movies
const reviews = data.reviews

const main = async () => {
        const db = await connection.dbConnection();
        await db.dropDatabase();

        let date = new Date()
        let day = date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();
        let fullDate = `${month}/${day}/${year}`;

        const fortytwo = await movies.createMovie("Forty Two", 
                "In 1947, Jackie Robinson becomes the first African-American to play in Major League Baseball in the modern era when he was signed by the Brooklyn Dodgers and faces considerable racism in the process.", 
                ["Biography", "Drama", "Sport"], "PG-13", "Warner Brothers", "Brian Helgeland", 
                ["Chadwick Boseman", "Harrison Ford", "Nicole Beharie", "Christopher Meloni"], 
                "04/09/2013", "2h 8min");
        //console.log(fortytwo);
        const club = await movies.createMovie("The Breakfast Club",
                "Five high school students meet in Saturday detention and discover how they have a lot more in common than they thought.",
                ["Comedy", "Drama"], "R", "Universal Pictures", "John Hughes",
                ["Judd Nelson", "Molly Ringwald", "Ally Sheedy", "Anthony Hall", "Emilio Estevez"],
                "02/07/1985","1h 37min" );
        
        const fortytworeview1 = await reviews.createReview(fortytwo._id, 'Good Movie', 'ScaryCat', 'The movie is good and motivating', 3, fullDate)
        //console.log(fortytworeview1)

        const fortytworeview2 = await reviews.createReview(fortytwo._id, 'Okayish Movie', 'Moonlight', 'The movie is ok', 3.6, fullDate)
        //console.log(fortytworeview2)
        
        const fortytworeviews = await reviews.getAllReviews(fortytwo._id.toString())
       // console.log(fortytworeviews)
 //works
        const moviebyid = await movies.getMovieById(fortytwo._id.toString())
       // console.log(moviebyid)
        //works
        // const getreview1 = await reviews.getReview(fortytwo._id.toString())
        // console.log(getreview1)

        const removeReview1 = await reviews.removeReview(fortytworeview1._id.toString())
        console.log(removeReview1)

        const fortytworeviews3 = await reviews.getAllReviews(fortytwo._id.toString())
        console.log(fortytworeviews3)
 
     
/*
        //works
        const fortytworeviews = await reviews.getAllReviews(fortytwo._id.toString())
        console.log(fortytworeviews)

        const movieList = await movies.getAllMovies();
        console.log(movieList);
        console.log() ; */

       /*  const club = await movies.createMovie("The Breakfast Club",
                "Five high school students meet in Saturday detention and discover how they have a lot more in common than they thought.",
                ["Comedy", "Drama"], "R", "Universal Pictures", "John Hughes",
                ["Judd Nelson", "Molly Ringwald", "Ally Sheedy", "Anthony Hall", "Emilio Estevez"],
                "02/07/1985","1h 37min" );
        console.log(club);

        //works
        const movieList = await movies.getAllMovies();
        console.log(movieList);
        console.log() ;

        //works
        const updateclub = await movies.updateMovie(club._id.toString(),
                "Breakfast Club",
                "5 high school students meet in Saturday detention and discover how they have a lot more in common than they thought.",
                ["Comedy", "Drama"], "R", "Universal Pictures", "John Hughes",
                ["Judd Nelson", "Molly Ringwald", "Emilio Estevez"],
                "02/08/1985","1h 30min" 
        )
        console.log(updateclub);

         //works
        const moviebyid1 = await movies.getMovieById(club._id.toString());
        console.log(moviebyid1);
        console.log() ; 

           //works
        const removeTwo = await movies.removeMovie(club._id.toString())
        console.log(removeTwo);
        console.log();
        console.log("List of all movies");
        const movielist = await movies.getAllMovies();
        console.log(movielist);

         console.log();
        const club = await movies.createMovie("The Breakfast Club",
                "Five high school students meet in Saturday detention and discover how they have a lot more in common than they thought.",
                ["Comedy", "Drama"], "R", "Universal Pictures", "John Hughes",
                ["Judd Nelson", "Molly Ringwald", "Ally Sheedy", "Anthony Hall", "Emilio Estevez"],
                "02/07/1985","1h 37min" );
        console.log(club);
        console.log();   
        
       const movieList = await movies.getAllMovies();
        console.log(movieList);
        console.log() ;

        const moviebyid = await movies.getMovieById(fortytwo._id.toString())
        console.log(moviebyid) 
         
        const hackers = await movies.createMovie("Hackers", 
                "Hackers are blamed for making a virus that will capsize five oil tankers.", 
                ["Crime", "Drama", "Romance"], "PG-13", "United Artists", "Iain Softley", 
                ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], 
                "09/15/1995", "1h 45min");
        console.log(hackers)

        console.log();

        const removeTwo = await movies.removeMovie(club._id.toString())
        console.log(removeTwo);

        console.log();
        console.log("List of all movies");
        const movielist = await movies.getAllMovies();
        console.log(movielist);


};

main();

*/