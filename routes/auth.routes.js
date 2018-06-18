const express = require('express');
const { auth } = require('../controllers/auth-controller');

const router = express.Router();


router.route('/auth').post(auth);

module.exports = router;
