const multer = require("multer");

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