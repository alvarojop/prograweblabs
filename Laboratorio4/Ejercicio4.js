const express = require('express');
const app = express();
const port = 8080;

app.get('/hello/:name', function (req, res) {
    res.send(req.params);
});

app.listen(port);