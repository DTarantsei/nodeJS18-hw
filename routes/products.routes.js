const express = require('express');
const tokenValidator = require('../middlewares/token-validator');
const {
  getProducts,
  addProduct,
  getProductById,
  getReviews,
} = require('../controllers/product-controller');

const router = express.Router();


// router.use(tokenValidator);

router.route('/products')
    .get(getProducts)
    .post(addProduct);
router.get('/products/:id', getProductById);
router.get('/products/:id/reviews', getReviews);

module.exports = router;
