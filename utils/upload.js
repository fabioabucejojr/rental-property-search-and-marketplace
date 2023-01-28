const router = require("express").Router();
const multer = require("multer");
const storage = multer.diskStorage({

//multer middleware
const upload = multer( { storage: storage })

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