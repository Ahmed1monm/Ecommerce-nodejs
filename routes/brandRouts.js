const express = require('express');
const BrandController = require('../services/brandController');
const{ getBrandValidator , updateBrandValidator, deleteBrandValidator, createBrandValidator} = require('../utils/validators/brandValidator');

const router = express.Router();
// Any route will deliver to subCategories routers 

router.route("/")
    .post(createBrandValidator, BrandController.createBrand)
    .get(BrandController.getBrands);
router.route('/:id')
    .get(getBrandValidator, BrandController.getBrandByID)
    .put(updateBrandValidator, BrandController.updateBrand)
    .delete(deleteBrandValidator, BrandController.deleteBrandByID);

module.exports = router;