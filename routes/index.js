const express = require('express')
    , app = express();

app.listen(3000, () => {
    console.log(`Join http://localhost:3000/`);
});

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.get('/api', function(req, res) {
    const { item, id } = req.query;
    const data = require('./api')(item, id)
    res.json(data);
});

app.get('*', function(req, res){
    res.status(404).send('Error 404');
});