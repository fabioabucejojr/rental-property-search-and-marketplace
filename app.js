import express, { application, Router } from "express"
import bodyParser from "body-parser"
import { connectDatabase } from "./pool.js"
import { v4 as uuidv4 } from "uuid"
import { generateJWT } from "./jwt/jwtGenerator.js"
import bcrypt from "bcryptjs"
import { auth } from "./middleware/auth.js"
import cors from "cors"
import multer from "multer"


const app = express()
const pool = connectDatabase()
const PORT = 5000


app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

//static route
app.use('/img', express.static('public/uploads'))


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

app.get('/profile', auth, async (req, res) => {
    try {
        res.json(req.user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ msg: "Unauthenticated" });

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

//multer middleware
const upload = multer( { storage: storage })

app.post('/upload', upload.single('my-image'), async (req, res) => {
    
    const { filename } = req.file
    //console.log(filename)
    const newPicture = await pool.query(`
    INSERT INTO profile_photos VALUES
    (default, $1)
    `, [filename])

    res.json( {msg: "Image uploaded"} )
})

app.get('/photos', async (req, res) => {
    try {

        const response = await pool.query(`
        SELECT * FROM profile_photos
        `)

        res.json(response.rows)
    } catch (error) {
        console.log(error.message)
    }
})

pool.connect((err) => {
    if (err) {
        console.log(err.message)
    }
    else {
        app.listen(PORT, () => {
            console.log(`Server has started on http://localhost:${PORT}`)
        })
    }
})