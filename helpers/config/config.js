require('dotenv').config();

// database connection credentials
exports.ConnectionString = {
    user: process.env.user,
    password: process.env.password,
    server: process.env.server,
    database: process.env.database
};

exports.CORS = (req, res, next) => {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Authorization,Access-Control-Request-Method, Access-Control-Request-Headers,Access-Control-Allow-Origin");
    next();
};