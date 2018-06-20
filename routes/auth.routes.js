const express = require('express');
const { auth } = require('../controllers/auth-controller');

const router = express.Router();


router.post('/auth', auth);

module.exports = router;
