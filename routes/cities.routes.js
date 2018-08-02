const express = require('express');
const {
  random,
  getAll,
  addOne,
  deleteOne,
} = require('../controllers/cities-controller');

const router = express.Router();


router.route('/cities')
    .get(getAll)
    .post(addOne);
router.get('/cities/random', random);
router.delete('/cities/:id', deleteOne);

module.exports = router;
