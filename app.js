'use strict';

let express = require('express');

let app = express();

app.use(function (req, res, next) {
   res.end('Welcom to my node club.'); 
});

app.listen(3001, function () {
   console.log('Server listening on port 3001.'); 
});