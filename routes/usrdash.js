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

    // If the user"s ID does not match the dashboard user's ID, return a 403 error
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

router.get("/user/profile", authorization, async (req, res) => {
  try {
    const {user_id} = req.params;
    const profile = await pool.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
    res.json(profile.rows[0])
  } catch (error) {
      console.error(error.message);
      res.status(500).send({ msg: "Unauthenticated" });
  }
});

// updates user's profile
router.put("/user/profile/:user_id", authorization, async (req, res) => {
  try {
    const { user_id } = req.params;
    const {first_name,middle_name,last_name,bdate, user_email, user_password, user_type, companions, contact_num,created_at} = req.body;
    const updateProfile = await pool.query("UPDATE users SET first_name = $1,middle_name = $2,last_name = $3,bdate = $4, user_email = $5, user_password = $6, user_type = $7, companions = $8, contact_num = $9, created_at = $10 WHERE user_id = $11 RETURNING *", [first_name, middle_name, last_name, bdate, user_email, user_password, user_type, companions, contact_num, created_at, user_id]
    );
    res.json(updateProfile.rows[0]);
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
});

router.get("/user/properties/:user_id", async (req, res) => {
  // handle request for the user's properties
  try {
    const {user_id} = req.params;
    const properties = await pool.query("SELECT * FROM properties WHERE user_id = $1", [user_id]);
    res.json(properties.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
});

router.put("/user/properties/:user_id", async (req, res) => {
  //updates user's search results properties
  try {
    const {user_id} = req.params;
    const updateProperties = await pool.query("UPDATE * FROM properties WHERE user_id = $1", [user_id]);
    res.json(updateProperties.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
});

router.get("/user/transactions/:user_id", async (req, res) => {
  // handle request for the user's transaction history
  try {
    const {user_id} = req.params;
    const usersTransactions = await pool.query("SELECT * FROM transactions WHERE user_id = $1", [user_id]);
    res.json(usersTransactions.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
});

router.put("/user/transactions/:user_id", async (req, res) => {
  // handles updates of the user's transaction
  try {
    const {user_id} = req.params;
    const transactions = await pool.query("SELECT * FROM transactions WHERE user_id = $1", [user_id]);
    res.json(transactions.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
});

router.get("/user/payments/:user_id",async (req, res) => {
  // handle request for the user's payment history
  try {
    const {user_id} = req.params;
    const payments = await pool.query("SELECT * FROM payments WHERE user_id = $1", [user_id]);
    res.json(payments.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
});


// get a renter
router.get("/renter/:user_id", authorization, async (req, res) => {
  // handle requests for a tenant
  try {
    const { user_id } = req.params;
    const renters = await pool.query("SELECT * FROM users WHERE user_id = $1", [user_id])
    res.json(renters.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
});

// get all transactions
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

// get a transaction
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

// update a transaction
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


// delete a transaction
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

// for the maintenance costs and utilities
router.get("/payables", (req, res) => {
  // handle requests for the payables page
  try {

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

//get all billingstatements
router.get('/billingstatements', authorization, async (req, res) => {
  try {
    // retrieve all billing statements
    const billingStatements = await pool.query('SELECT * FROM billing');
    // return the billing statements
    res.json(billingStatements.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'An error occurred while retrieving the billing statements' });
  }
});

//get a billingstatement
router.get("/billingstatement/:billing_id", authorization, async (req, res) => {
  try {
    const {billing_id} = req.params;
    const billingstatement = await pool.query("SELECT * FROM billing WHERE billing_id = $1", [billing_id]);
    res.json(billingstatement.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "An error occurred while processing the request" });
  };
});

// update the billing statement
router.put("/billingstatement/:billing_id", authorization, async (req, res) => {
  try {
    const { billing_id } = req.params;
    const {total_amount_due,
      total_consumption_perkwh,
      current_reading,
      previous_reading,
      add_others} = req.body;
    const updateStatement = await pool.query(
      "UPDATE billing SET total_amount_due = $1, total_consumption_perkwh = $2, current_reading = $3, previous_reading = $4, add_others = $5 WHERE billing_id = $6 RETURNING *",
      [total_amount_due, total_consumption_perkwh, current_reading, previous_reading, add_others, billing_id]
    );
    res.json(updateStatement.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
});

// delete a billing statement
router.delete("/billingstatement/:billing_id", authorization, async (req, res) => {
  try {
    const { billing_id } = req.params;
    const result = await pool.query("DELETE FROM billing WHERE billing_id = $1 RETURNING *", [billing_id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Billing statement not found" });
    }
    res.json({ message: "Billing statement deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
});

router.get("/data", (req, res) => {
  // code to retrieve data from the dashboard and send it back to the client
  try {

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "An error occurred while processing the request" });

  }
});

const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: '8}Ry^4D^q#*5gH(L',
  database: 'kmshradb'
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