const express = require('express');
const {
  random,
  getAll,
  addOne,
  deleteOne,
} = require('../controllers/cities-controller');

const router = express.Router();


router.get('/cities', getAll);
router.get('/random', random);
router.post('/city', addOne);
router.delete('/city/:id', deleteOne);

module.exports = router;
