const connection = require('./config/mongoConnection');
const movies = require('./data/movies')

const main = async () => {
        const db = await connection.dbConnection();
        await db.dropDatabase();

        console.log("Adding Movie One into database");
        const fortytwo = await movies.createMovie("Forty Two", 
                "In 1947, Jackie Robinson becomes the first African-American to play in Major League Baseball in the modern era when he was signed by the Brooklyn Dodgers and faces considerable racism in the process.", 
                ["Biography", "Drama", "Sport"], "PG-13", "Warner Brothers", "Brian Helgeland", 
                ["Chadwick Boseman", "Harrison Ford", "Nicole Beharie", "Christopher Meloni"], 
                "04/09/2013", "2h 8min");
        try {
                console.log(fortytwo);
        } catch (e) {
                console.log(e);
        }

        console.log();
        console.log("Adding Movie Two into database");
        const club = await movies.createMovie("The Breakfast Club",
                "Five high school students meet in Saturday detention and discover how they have a lot more in common than they thought.",
                ["Comedy", "Drama"], "R", "Universal Pictures", "John Hughes",
                ["Judd Nelson", "Molly Ringwald", "Ally Sheedy", "Anthony Hall", "Emilio Estevez"],
                "02/07/1985","1h 37min" );
        try{
                console.log(club);
        } catch(e) {
                console.log(e);
        }

        console.log();
        console.log("List of all movies");
        try {
                const movieList = await movies.getAllMovies();
                console.log(movieList);
        } catch (e) {
                console.log(e);
        }

        console.log();
        console.log("Adding Movie Three into database");
        const hackers = await movies.createMovie("Hackers", 
                "Hackers are blamed for making a virus that will capsize five oil tankers.", 
                ["Crime", "Drama", "Romance"], "PG-13", "United Artists", "Iain Softley", 
                ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], 
                "09/15/1995", "1h 45min");
        try{
                console.log(hackers);

        } catch(e) {
                console.log(e);
        }

        console.log();
        console.log("Renaming movie One!");
        try{
                const renamedOne = await movies.renameMovie(fortytwo._id.toString(), "42"); 
                console.log(renamedOne);

        } catch(e) {
                console.log(e);
        }

        console.log();
        console.log("Removing movie Two");
        try{
                const removeTwo = await movies.removeMovie(club._id.toString())
                console.log(removeTwo);

        } catch(e) {
                console.log(e);
        }

        console.log();
        console.log("List of all movies");
        try {
                const movieList = await movies.getAllMovies();
                console.log(movieList);
        } catch (e) {
                console.log(e);
        } 

        console.log();
        console.log("Creating movie with bad inputs");
        try{
                const badinput = await movies.createMovie("Forty Two", 
                "In 1947, Jackie Robinson becomes the first African-American to play in Major League Baseball in the modern era when he was signed by the Brooklyn Dodgers and faces considerable racism in the process.", 
                ["Biography", "Drama", "Sport"], "PG-13", "Warner Brothers", "Brian Helgeland", 
                ["Chadwick Boseman", "Harrison Ford", "Nicole Beharie", "Christopher Meloni"], 
                "09/30/2019", "2.5h 6min");
                console.log(badinput);

        } catch(e) {
                console.log(e);
        }

        console.log();
        console.log("Let's remove movie that does not exist");
        try{
                const removeTwo = await movies.removeMovie(club._id.toString())
                console.log(removeTwo);

        } catch(e) {
                console.log(e);
        }

        console.log();
        console.log("Let's rename movie that does not exist!");
        try{
                const renamedOne = await movies.renameMovie(fortytwo._id.toString(), "42"); 
                console.log(renamedOne);

        } catch(e) {
                console.log(e);
        }

        console.log();
        console.log("Renaming movie One with bad inputs");
        try{
                const renamedOne = await movies.renameMovie(hackers._id.toString(), [1234]); 
                console.log(renamedOne);

        } catch(e) {
                console.log(e);
        }

        console.log();
        console.log("Searching movie that doesnot exist");
        try{
                const getmovie = await movies.getMovieById(club._id.toString())
                console.log(getmovie);

        } catch(e) {
                console.log(e);
        }

        console.log();
        await connection.closeConnection();
        console.log('Done!');
};

main();
