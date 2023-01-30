const express = require('express');
const productController = require('../services/productController');
const{  createProductValidator, getProductValidator, updateProductValidator, deleteProductValidator } = require('../utils/validators/productValidator');

const router = express.Router();

router.route("/")
    .post(createProductValidator, productController.createProduct)
    .get(productController.getProducts);
router.route('/:id')
    .get(getProductValidator, productController.getProductByID)
    .put(updateProductValidator, productController.updateProduct)
    .delete(deleteProductValidator, productController.deleteProductByID);

module.exports = router;