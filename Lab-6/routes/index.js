//Here you will require both route files and export the constructor method as shown in lecture code where there is more than one route file. Look at lecture 6 lecture code for example

// when the route is /movies use the routes defined in movies.js routing file, when the route is /reviews use the routes defined in reviews.js routing file, all other enpoints should return a 404 as shown in the lecture code.

const movies_routes = require("./movies");
const reviews_routes = require("./reviews");

const constructor = (app) => {
    app.use('/movies', movies_routes);
    app.use('/reviews', reviews_routes);

    //for accessing unknown routes
    app.use("*", (req, res) => {
        res.status(404).json({ serverResponse: "Not found." });
    });
};

module.exports = constructor;