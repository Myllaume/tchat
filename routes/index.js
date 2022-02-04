const express = require('express')
    , app = express();

app.listen(3000, () => {
    console.log(`Join http://localhost:3000/`);
});

app.get('/', function(req, res) {
    res.send('Hello World!');
});