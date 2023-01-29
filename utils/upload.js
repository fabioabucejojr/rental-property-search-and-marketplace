const express = require("express");
const router = require("express").Router();
const multer = require("multer");
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});


//multer middleware
const upload = multer({ storage: storage });

router.post('/upload', upload.single('my-image'), async (req, res) => {

    const { filename } = req.file
    //console.log(filename)
    const newPicture = await pool.query(`
    INSERT INTO profile_photos VALUES
    (default, $1)
    `, [filename])

    res.json( {msg: "Image uploaded"} )
})

router.get('/photos', async (req, res) => {
    try {

        const response = await pool.query(`
        SELECT * FROM profile_photos
        `)

        res.json(response.rows)
    } catch (error) {
        console.log(error.message)
    }
})

module.exports = router;