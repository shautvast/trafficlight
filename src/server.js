const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 5555;
const DATA_PATH = process.env.DATA_PATH || "data";

express()
    .use(express.urlencoded({extended: true}))
    .use(express.static(path.join(__dirname, '/public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get("/data", (req, res) => sendData(req, res))
    .get('/', (req, res) => res.render('pages/index'))
    .post('/submit-form', (req, res) => appendToStorage(req, res))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

function appendToStorage(req, res) {
    if (req.body.username === '') {
        res.render('pages/error');
    } else {
        fs.appendFile(DATA_PATH + "/data.csv", req.body.timestamp + ", " + req.body.username + ", " + req.body.emotion + "\n", err => {
            if (err) {
                return console.log(err);
            }
        });
        res.render('pages/thanks');
    }
}

function sendData(req, res) {
    fs.readFile("data.csv", (err, data) => {
        if (err) {
            console.error(err);
            res.render('pages/error');
        } else {
            return res.send(data);
        }
    });
}