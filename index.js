const express = require('express');
// const mongoose = require('mongoose');
//const dbConfig = require('./config/db.config');
const cors = require('cors');
const bodyParser = require('body-parser');
const auth = require('./middlewares/auth');
const errors = require('./middlewares/errors');

const unless = require('express-unless');

const app = express();


// enable CORS
app.use(cors());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));




auth.authenticateToken.unless = unless;
app.use(
    auth.authenticateToken.unless({
        path: [
            { url: "/users/login", methods: ["POST"]},
            { url: "/users/register", methods: ["POST"] },
            { url: "/users/getOneBook", methods: ["GET"] },
            { url: "/users/GetBooks", methods: ["GET"] },
            { url: "/users/getBookCategoryWise", methods: ["GET"] }  ,
            { url: "/users/newsletter", methods: ["POST"] },
            { url: "/users/events", methods: ["GET"] }

        ],
    })
);  

app.use(express.json());

app.use("/users", require("./routes/users.routes"));
app.use("/auth", require("./routes/auth.routes"));

app.use(errors.errorHandler);



app.listen (process.env.port || 4000, function () {
    console.log("Ready to Go!");
} );