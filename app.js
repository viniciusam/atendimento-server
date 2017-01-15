var express = require('express');
var cors = require('cors')
var app = express();
var mongo = require('mongodb').MongoClient;

const DB_URL = 'mongodb://192.168.99.100:27017/atendimento';

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}));

app.use('/', express.static('public'));

app.get('/categories', (req, res) => {
    mongo.connect(DB_URL)
        .then(db => db.collection('categories').find().toArray())
        .then(result => res.json(result));
});

app.get('/forms/:id', (req, res) => {
    const formId = +(req.params['id']);

    mongo.connect(DB_URL)
        .then(db => db.collection('forms').find({ id: formId }).next())
        .then(result => res.json(result));
});

app.use((err, req, res, next) => {
    res.status(500);
    res.render('error', { error: err });
});

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});
