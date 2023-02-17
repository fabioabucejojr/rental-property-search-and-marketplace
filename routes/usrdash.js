const express = require("express");
const router = require("express").Router();
const pool = require("../db");
const cors = require("cors");
// const authorization = require("../middleware/authorization");

// Custom authorization middleware
const authorization = async (req, res, next) => {
  try {
    // Get the user"s ID from the request
    const user_id = req.user;

    // Get the ID of the user whose dashboard is being accessed
    const dashboardUserId = req.params.user_id;

    // If the user"s ID does not match the dashboard user"s ID, return a 403 error
    if (user_id !== dashboardUserId) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    // If the user is authorized, call the next middleware function
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//middleware
router.use(cors())
router.use(express.json()); //req body

// User Dashboard routes

router.get("/", async (req, res) => {
    try {
        res.json(req.user);
        const user = await pool.query("SELECT user_email FROM users WHERE user_id = $1", [req.user]);

        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})

// for the rental properties search filters
router.get("/marketplace", (req, res) => {
  // handle requests for the marketplace page
  try {

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "An error occurred while processing the request" });

  }
});

// SEARCH FILTERS


// READ user"s profile
router.get("/users/:user_id", authorization, async (req, res) => {
  try {
    const {user_id} = req.params;
    const profile = await pool.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
    res.json(profile.rows[0])
  } catch (error) {
      console.error(error.message);
      res.status(500).send({ msg: "Unauthenticated" });
  }
});

// UPDATE a user profile
router.put("/users/:user_id", authorization, async (req, res) => {
    const {first_name, last_name, user_email, bdate, user_password, user_type} = req.params;
    const query = await pool.query(`UPDATE users SET first_name = $1, last_name = $2, bdate = $3, user_email = $4, user_password = $5, user_type = $6 WHERE user_id = $7`);
  try {
    const result = await pool.query(query, [first_name, last_name, bdate, user_email, user_password, user_type ]);
    res.status(200).send(`User modified with ID: ${result.insertUserId}`);
  } catch (error) {
      res.status(500).send(`Error modifying user: ${error.message}`);
  }
});

// CREATE - Add a new property listing for a user
router.post("/property", async (req, res) => {
  try {
    const { user_id, property_name, city, state, zip_code, price, bedrooms, bathrooms } = req.body;
    const propertyData = [ user_id, property_name, city, state, zip_code, price, bedrooms, bathrooms ];
    const propertySQL = "INSERT INTO properties ( user_id, property_name, city, state, zip_code, price, bedrooms, bathrooms ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
    const result = await pool.query(propertySQL, propertyData);
    res.status(201).json({
      status: "success",
      message: "Property listing added successfully!",
      data: result.rows[0],
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Failed to add property listing",
      error: err,
    });
  }
});

// READ - Get a user"s property listing
router.get("/property/:user_id", async (req, res) => {
  try {
    const propertyId = [req.params.id];
    const propertySQL = "SELECT * FROM properties WHERE id = $1";
    const result = await pool.query(propertySQL, propertyId);
    res.status(200).json({
      status: "success",
      message: "Property listing retrieved successfully!",
      data: result.rows[0],
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Failed to retrieve property listing",
      error: err,
    });
  }
});

// UPDATE - Edit a user"s property listing
router.put("/property/:prop_id", async (req, res) => {
  try {
    const prop_id = [req.params.prop_id];
    const { property_name, city, state, zip_code, price, bedrooms, bathrooms } = req.body;
    const propertyData = [property_name, city, state, zip_code, price, bedrooms, bathrooms, prop_id];
    const propertySQL = "UPDATE properties SET property_name = $1, city = $2, state = $3, zip_code = $4, price = $5, bedrooms = $6, bathrooms = $7 WHERE prop_id = $8";
    const result = await pool.query(propertySQL, propertyData);
    res.status(200).json({
      status: "success",
      message: "Property listing updated successfully!",
      data: result.rows[0],
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Failed to update property listing",
      error: err,
    });
  }
});

// DELETE - Delete a user"s property listing
router.delete("/property/:prop_id", (req, res) => {
  const prop_id = req.params.prop_id;
  pool.query(`DELETE FROM properties WHERE prop_id = "${prop_id}"`, (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`Property with ID: ${prop_id} deleted.`);
  });
});

// const PORT = process.env.PORT || 5000;
// router.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}.`);
// });

// READ - Get a user"s transaction history
router.get("/transactions/", async (req, res) => {
  // handle request for the user"s transaction history
  try {
    const {user_id} = req.params;
    const usersTransactions = await pool.query("SELECT * FROM transactions WHERE user_id = $1", [user_id]);
    res.json(usersTransactions.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
});

// UPDATE - Edit a user"s transaction history
router.put("/transactions/:transaction_id", async (req, res) => {
  // handles updates of the user"s transaction
  try {
    const {user_id} = req.params;
    const transactions = await pool.query("SELECT * FROM transactions WHERE user_id = $1", [user_id]);
    res.json(transactions.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
});

// GET ALL transactions
router.get("/transactions", authorization, async (req, res) => {
  // handle requests for the list of transactions
  try {
    const allTransactions = await pool.query("SELECT * FROM transactions")
    res.json(allTransactions.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
});

// GET a transaction
router.get("/transactions/:transactions_id", authorization, async (req, res) => {
  // handle requests for the transactions page
  try {
    const { transactions_id } = req.params;
    const transactions = await pool.query("SELECT * FROM transactions WHERE transactions_id = $1", [transactions_id])
    res.json(transactions.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
});

// UPDATE a transaction
router.put("/transactions/:transactions_id", authorization, async (req, res) => {
  try {
    const { transactions_id } = req.params;
    const { rental_unit_id, billing_type_id, payment_id, due_date, amount, user_id } = req.body;
    const updateTransaction = await pool.query("UPDATE transactions SET rental_unit_id = $1, billing_type_id = $2, payment_id = $3, due_date = $4, amount = $5, user_id = $6 WHERE transactions_id = $7 RETURNING *", [rental_unit_id, billing_type_id, payment_id, due_date, amount, user_id, transactions_id]);
    res.json(updateTransaction.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
});

// DELETE a transaction
router.delete("/transactions/:transaction_id", authorization, async (req, res) => {
  const { transactions_id } = req.params;
  try {
    const deleteTransaction = await pool.query("DELETE FROM transactions = $1 RETURNING *", [transactions_id]);
    if (deleteTransaction.rowCount === 0) {
      return res.status(404).json({ error: "Transactions not found" });
    }
    res.json({ message: "Transaction was deleted successfully!" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
});

router.get("/reports", (req, res) => {
  // handle requests for the reports page
  try {

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "An error occurred while processing the request" });

  }
});

const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  password: "8}Ry^4D^q#*5gH(L",
  database: "kmshradb"
});

client.connect();

// const router = require("express").Router();
//
router.post("/documents", (req, res) => {
    const { doc_id, owner_id, name, file_type, file_size, created_at, file_data } = req.body;
    pool.query(
        "INSERT INTO documents (doc_id, owner_id, name, file_type, file_size, created_at, file_data) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [doc_id, owner_id, name, file_type, file_size, created_at, file_data],
        (error, results) => {
            if (error) {
                res.status(500).send({ error });
            } else {
                res.status(201).send(`document added with ID: ${results.insertId}`);
            }
        }
    );
});

module.exports = router;

// Retrieve a document
router.get("/documents/:owner_id", authorization, async (req,res) => {
  try {
    const {owner_id} = req.params;
    const documents = await pool.query("SELECT * FROM documents WHERE id = $1",[owner_id])
    res.json(documents.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({error: "An error occurred while processing the request"});
  }
});

// Update a document
router.put("/documents/:docu_id", authorization, async (req, res) => {
  try {
    const {docu_id} = req.params;
    const {name, file_type, file_size, file_data, created_at} = req.body;
    const updateDocs = await pool.query("UPDATE documents SET name, file_type = $1, file_size = $2, file_data = $3, created_at = $4 WHERE docu_id = $5",
    [name, file_type, file_size, file_data, created_at, docu_id]);
    res.json(updateDocs.rows[0]);
  } catch (err) {
    // eslint-disable-next-line no-undef
    console.log(results.rowCount + " document updated");
    res.status(500).json({error: "An error occurred while processing the request"});
  }
})

// Delete a document
router.delete("/documents/docu_id", authorization, async(req,res) => {
  try {
    const {docu_id} = req.params;
    const result = await pool.query("DELETE FROM documents WHERE docu_id = $1 RETURN * ", [docu_id]);
    if (result.rowCount === 0) {
      return res.status(404).json({error: "Document not found"});
    }
    res.json("Document deleted successfully!")
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
});


client.end();

// router.get("/documents", (req, res) => {
//   // handle requests for the documents page
//   try {

//   } catch (err) {
//     console.log(err.message);
//     res.status(500).json({ error: "An error occurred while processing the request" });

//   }
// });

module.exports = router;