const express = require("express");
const app = express("");
const cors = require("cors");
const fs = require("fs");
const morgan = require("morgan");

//middlewares
app.use(cors());
app.use(express.json())

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))



//ROUTES//

//register and login routes

app.use("/auth", require("./routes/jwtAuth"));

app.use("/dashboard", require("./routes/dashboard"));


app.listen(5000, () => {
    console.log("server is running on port 5000");
});