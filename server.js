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

//upload link
app.post('/upload', (req, res) => {
    let file = req.files.image;
    let date = new Date();
    let imageName = date.getDate() + date.getTime() + file.name;

    let path = 'public/uploads/' + imageName;

    file.mv(path, (err, result) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.json(`uploads/${imageName}`);
        }
    });
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
})