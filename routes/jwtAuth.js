const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
// const dotenv = require("dotenv").config();
const validInfo = require("../middleware/validinfo");
const authorization = require("../middleware/authorization");
//const app = express();

router.post("/register", validInfo, async (req, res) => {
    try {
        
        //1. destructure the req.body (name, email)

        const { first_name, last_name, bdate, user_email, user_password, user_type } = req.body;
        
        //2. check if user exist (if user exist then throw error)

        const user = await pool.query(`
            SELECT * FROM users 
            WHERE user_email = $1`
            , [user_email])
            
        if (user.rows.length !== 0) {
            res.status(401).json("Username has been taken")
        }
        
        //3. Bcrypt the user password

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound)

        const bcryptPassword = await bcrypt.hash(user_password, salt);
        
        //4. enter the new user inside our database

        const newUser = await pool.query("INSERT INTO users (first_name,last_name,bdate,user_email,user_password,user_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING * ", [first_name, last_name, bdate, user_email, bcryptPassword, user_type]);
        
        //res.json(newUser.rows[0]);
        //5. generating our jwt token

        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({ token });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});
// //home route
// router.post("/home", async (req, res) => {
//     try {
        
//     } catch (err) {
//         console.error(err.message)
        
//     }
// })
//login route

router.post("/login", async (req, res) => {
    try {
        
        //1. destructure the req.body

        const { user_email, user_password } = req.body;
        console.log(req.body)
        //2. check if user doesn't exist (if not then we throw error)

        const user = await pool.query(`
            SELECT * FROM users 
            WHERE user_email = $1`
            , [user_email])
            //console.log(user.rows)
        if (user.rows.length <= 0) {
            res.status(401).json("Username does not exist")
        }
       
        //3. check if incoming password is the same the database password

        const validPassword = await bcrypt.compare(user_password, user.rows[0].user_password);

        if (!validPassword) {
            return res.status(401).json("Password or Email is incorrect");
        }


        //4. give them the jwt token

        const token = jwtGenerator(user.rows[0].user_id);

        res.json({ token });

    } catch (err) {
        console.error(err.message);
    }
});

router.get("/is-verify", authorization, async (req, res) => {
    try {
        //res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;