const express = require("express");
const app = express("");
const cors = require("cors");
const fs = require("fs");
const { Client } = require("pg");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const usrdashRoutes = require("./routes/usrdash");
const admdashRoutes = require("./routes/dashboard");
const {v4: uuidv4} = require("uuid");
const {generateJWT} = require("./utils/jwtGenerator.js");
const bcrypt = require("bcrypt");
const {auth} = require("./middleware/authorization.js");
const multer = require("multer");
const pool = ""
// const data = require("./data.json");


// Backend routes for mock data properties
const router = express.Router();


// Read the data.json file and parse its contents
const data = JSON.parse(fs.readFileSync("./data2.json"));
// const data = JSON.parse(fs.readFileSync("data2.json"));

// Get all rental properties
router.get("/", (req, res) => {
  res.json(data);
});

// Get a single rental property by ID
router.get("/:prop_id", (req, res) => {
  const id = parseInt(req.params.id);
  const property = data.find(p => p.id === id);
  if (property) {
    res.json(property);
  } else {
    res.status(404).json({ message: "Property not found" });
  }
});

// Add a new rental property
router.post("/", (req, res) => {
  const property = req.body;
  // Generate a new ID by finding the highest existing ID and adding 1
  const id = data.reduce((maxId, p) => Math.max(maxId, p.id), 0) + 1;
  property.id = id;
  data.push(property);
  // Write the updated data to the data.json file
  fs.writeFileSync("data2.json", JSON.stringify(data, null, 2));
  res.status(201).json(property);
});

// Update an existing rental property by ID
router.put("/:prop_id", (req, res) => {
  const id = parseInt(req.params.id);
  const propertyIndex = data.findIndex(p => p.id === id);
  if (propertyIndex === -1) {
    res.status(404).json({ message: "Property not found" });
  } else {
    const updatedProperty = req.body;
    updatedProperty.id = id;
    data[propertyIndex] = updatedProperty;
    // Write the updated data to the data.json file
    fs.writeFileSync("data2.json", JSON.stringify(data, null, 2));
    res.json(updatedProperty);
  }
});

// Delete a rental property by ID
router.delete("/:prop_id", (req, res) => {
  const id = parseInt(req.params.id);
  const propertyIndex = data.findIndex(p => p.id === id);
  if (propertyIndex === -1) {
    res.status(404).json({ message: "Property not found" });
  } else {
    data.splice(propertyIndex, 1);
    // Write the updated data to the data.json file
    fs.writeFileSync("data2.json", JSON.stringify(data, null, 2));
    res.status(204).send();
  }
});

module.exports = router;


//middlewares
app.use(cors());
app.use(express.json()) //req.body
app.use(bodyParser.urlencoded({ extended: true }))

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(__dirname + "/access.log", {flags: "a"})

//static route
app.use("/img", express.static("public/uploads"))

// setup the logger
app.use(morgan("combined", {stream: accessLogStream}))

//multer storage
const storage = multer.diskStorage( {
    destination: (req, file, cb) => {
        cb(null, "./public/uploads")
    },

    filename: (req, file, cb) => {
        const uniquePrefix = Date.now()
        cb(null, uniquePrefix + file.fieldname + ".png" )
    }
})

// const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//     // ssl: {
//     //   rejectUnauthorized: true
//     // }
//   });

  // client.connect();

  app.get("/properties", (req, res) => {
    const { property_type,
      property_name,
      price,
      city,
      state,
      zip_code,
      bedrooms,
      bathrooms,
      size,
      flooring,
      availability,
      availability_date,
      date_listed,
      age,
      images,
      lease_terms,
      pet_friendly,
      no_smoking,
      air_conditioning,
      wheelchair_accessible,
      ratings,
      review_count,
      reviews
       } = req.query;

    let query = `SELECT * FROM properties WHERE 1=1`;

    if (property_type) {
      query += ` AND property_type = "${property_type}"`;
    }
    if (property_name) {
      query += ` AND property_name <= ${property_name}`;
    }
    if (city) {
      query += ` AND city >= ${city}`;
    }
    if (state) {
      query += ` AND state >= ${state}`;
    }
    if (zip_code) {
      query += ` AND zip_code >= ${zip_code}`;
    }
    if (bedrooms) {
      query += ` AND bedrooms = "${bedrooms}"`;
    }
    if (bathrooms) {
      query += ` AND bathrooms <= ${bathrooms}`;
    }
    if (price) {
      query += ` AND price >= ${price}`;
    }
    if (size) {
      query += ` AND bedrooms >= ${size}`;
    }
    if (flooring) {
      query += ` AND bathrooms >= ${flooring}`;
    }
    if (availability) {
      query += ` AND location = "${availability}"`;
    }
    if (availability_date) {
      query += ` AND price <= ${availability_date}`;
    }
    if (date_listed) {
      query += ` AND price >= ${date_listed}`;
    }
    if (age) {
      query += ` AND bedrooms >= ${age}`;
    }
    if (images) {
      query += ` AND bedrooms >= ${images}`;
    }
    if (lease_terms) {
      query += ` AND bathrooms >= ${lease_terms}`;
    }
    if (pet_friendly) {
      query += ` AND location = "${pet_friendly}"`;
    }
    if (no_smoking) {
      query += ` AND price <= ${no_smoking}`;
    }
    if (air_conditioning) {
      query += ` AND price >= ${air_conditioning}`;
    }
    if (wheelchair_accessible) {
      query += ` AND bedrooms >= ${wheelchair_accessible}`;
    }
    if (ratings) {
      query += ` AND bathrooms >= ${ratings}`;
    }
    if (review_count) {
      query += ` AND bedrooms >= ${review_count}`;
    }
    if (reviews) {
      query += ` AND bathrooms >= ${reviews}`;
    }

    client.query(query, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
      }
      res.json(result.rows);
    });
  });

  module.exports = app;


//ROUTES//

//register and login routes

app.use("/auth", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/user", usrdashRoutes);
app.use("/admin", admdashRoutes);

//routes


app.post("/register", async (req, res) => {

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

app.post("/login", async (req, res) => {
    try {
        const { user_email, user_password } = req.body
        // Check if user exists in database
        const user = await pool.query(`SELECT * FROM users WHERE (user_email, user_password) = $1
        `, [user_email, user_password])
        if (user.rows[0].length === 0) {
            res.status(401).send("Username or password is incorrect")
        }
        // Check if password is correct  
        const validPassword = await bcrypt.compare(user_password, user.rows[0].user_password)

        if (!validPassword) {
            return res.status(401).json("Password or username is incorrect")
        }
        // User is authenticated, so set up the session  
        const token = generateJWT(user.rows[0])
        res.json({ token })

      // Redirect the user to their dashboard based on their user_type
      if (user.rows[0].user_type === "admin") {
        res.redirect("/admdashRoutes");
      } else {
        res.redirect("/usrdashRoutes");
      }        

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ msg: error.message });
    }
})



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get("/auth/is-verify", async(req,res) => {
    try {
        const {user_email} = req.query;
        const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [user_email]);
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    };
});

app.listen(5000, () => {
    console.log("server is running on port 5000");
});