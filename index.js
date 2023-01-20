const express = require("express");
const app = express("");
const cors = require("cors");
const fs = require("fs");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const usrdashRoutes = require("./routes/usrdash");
const {v4: uuidv4} = require("uuid");
const {generateJWT} = require("./utils/jwtGenerator.js");
const bcrypt = require("bcrypt");
const {auth} = require("./middleware/authorization.js");
const multer = require("multer");

//middlewares
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})

//static route
app.use('/img', express.static('public/uploads'))

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))

//multer storage
// filename here?
const storage = multer.diskStorage( {
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },

    filename: (req, file, cb) => {
        const uniquePrefix = Date.now()
        cb(null, uniquePrefix + file.fieldname + '.png' )
    }
})


//ROUTES//

//register and login routes

app.use("/auth", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/user", usrdashRoutes);

//routes
app.post('/register', async (req, res) => {

    const { first_name, user_email, user_password } = req.body

    const user = await pool.query(`
    SELECT * FROM users
    WHERE (first_name, user_email, user_password) = $1
    `, [first_name, user_email, user_password])

    if (user.rows.length > 0) {
        res.status(401).send("Username has been taken")
    }

    //Setup bcrypt
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(user_password, salt);

    const newUser = await pool.query(`
    INSERT INTO users (uuid, user_email, user_password)
    VALUES ($1, $2, $3) RETURNING *
    `, [uuidv4(), user_email, bcryptPassword])

    const token = generateJWT(newUser.rows[0])

    res.json({ token })

})

app.post('/login', async (req, res) => {
    try {
        const { user_email, user_password } = req.body

        const user = await pool.query(`
        SELECT * FROM users
        WHERE (user_email, user_password) = $1
        `, [user_email, user_password])

        if (user.rows[0].length < 0) {
            res.status(401).send("Username or password is incorrect")
        }

        const validPassword = await bcrypt.compare(user_password, user.rows[0].password)

        if (!validPassword) {
            return res.status(401).json("Password or username is incorrect")
        }

        const token = generateJWT(user.rows[0])
        res.json({ token })

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ msg: error.message });
    }
})



// app.get('/tweets', auth, async (req, res) => {
//     try {
//         const tweets = await pool.query(`
//         SELECT * FROM tweets
//         `)


//         res.json(tweets.rows)

//     } catch (error) {
//         console.error(error.message);
//     }
// })

// app.post('/tweets', auth, async (req, res) => {
//     try {
//         const { content } = req.body

//         const newTweet = await pool.query(`
//         INSERT INTO tweets (content) VALUES
//         ($1) RETURNING *
//         `, [content])

//         res.json("Tweet sent");
//     } catch (error) {

//     }
// })



app.listen(5000, () => {
    console.log("server is running on port 5000");
});