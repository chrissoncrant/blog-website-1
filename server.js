const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');

const PORT = 3000;

let initial_path = path.join(__dirname, 'public');

const app = express();

app.use(express.static(initial_path));
app.use(fileUpload());

app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "home.html"))
});

app.get('/editor', (req, res) => {
    res.sendFile(path.join(initial_path, "editor.html"))
})

app.post('/upload', (req, res) => {
    let file = req.files.image;
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let uploadDate = `${day}-${month}-${year}`;
    let fileName = `${uploadDate}-${file.name}`;

    let path = `public/uploads/${fileName}`;

    file.mv(path, (err) => {
        if (err) {
            res.status(500).json({
                error: err,
            })
        } else {
            res.json(`uploads/${fileName}`);
        }
    })
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
})