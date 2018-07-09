const express = require('express');
const tokenValidator = require('../middlewares/token-validator');
const { getAll } = require('../controllers/user-controller');

const router = express.Router();


// router.use(tokenValidator);

router.get('/users', getAll);

module.exports = router;
