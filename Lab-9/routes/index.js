const arraypath = require("./sortArray");

const constructorMethod = (app) => {
    app.use("/", arraypath)
    app.use('*', (req, res) => {
        res.status(404).json({error: 'Error: Not found'});
    });
};

module.exports = constructorMethod;