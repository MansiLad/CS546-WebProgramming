const userpath = require("./routesAPI");

const constructorMethod = (app) => {
    app.use("/", userpath)
    app.use('*', (req, res) => {
        res.status(404).json({error: 'Error: Not found'});
    });
};

module.exports = constructorMethod;