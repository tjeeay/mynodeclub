'use strict';

let express = require('express');
let site = require('../controllers/site');
let sign = require('../controllers/sign');


var router = express.Router();

router.get('/', site.index);

router.get('/signin', sign.showLogin);
router.post('/signin', sign.login);

router.get('/signup', sign.showSignup);
router.post('/signup', sign.signup);

router.post('/signout', sign.signout);


module.exports = router;