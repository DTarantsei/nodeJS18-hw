const express = require('express');
const {
  getProducts,
  addProduct,
  getProductById,
  getReviews,
} = require('../controllers/product-controller');

const router = express.Router();


router.route('/products')
    .get(getProducts);
    .post(addProduct);
router.get('/products/:id', getProductById);
router.get('/products/:id/reviews', getReviews);

module.exports = router;
