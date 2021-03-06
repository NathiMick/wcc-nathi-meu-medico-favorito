const express = require('express');
const cors = require('cors');

const routes = require("./routes/doctors.routes");
const index = require('./routes/index');

const app = express();


app
.use(cors())
.use(express.json())


.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headres",
        "Origin, X-Requested-With, Content-Type, Accept",
    );
    next();
})

// Access permissions for Front-End
app.options("/*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers")
    res.header(
      "Access-Control-Allow-Methods",
      "PUT,POST,GET,DELETE,OPTIONS,PATCH"
    );
    res.send();
  })
  

.use('/', index)
.use('/doctors', routes)



module.exports = app;