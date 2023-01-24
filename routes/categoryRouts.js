const express = require('express');
const categoryController = require('../services/categoryController');
const{ getCategoryValidator , updateCategoryValidator, deleteCategoryValidator, createCategoryValidator} = require('../utils/validators/categoryValidator');
const subCategoriesRoute = require("./subCategoryRouts");

const router = express.Router();
// Any route will deliver to subCategories routers 
router.use('/:categoryId/sub-categories', subCategoriesRoute) ;

router.route("/")
    .post(createCategoryValidator, categoryController.createCategory)
    .get(categoryController.getCategories);
router.route('/:id')
    .get(getCategoryValidator, categoryController.getCategoryByID)
    .put(updateCategoryValidator, categoryController.updateCategory)
    .delete(deleteCategoryValidator, categoryController.deleteCategoryByID);

module.exports = router;