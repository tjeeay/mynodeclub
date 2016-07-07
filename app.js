'use strict';

let express = require('express');

let app = express();

app.use((req, res, next) => {
   res.end('Welcom to my node club.'); 
});

app.listen(3001, ()=> {
   console.log('Server listening on port 3001.'); 
});