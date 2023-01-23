const express = require('express');
const subCategoryController = require('../services/subCategoryController');
const{ createSubCategoryValidator } = require('../utils/validators/SubCategoryValidator');

const router = express.Router();

router.route("/")
    .post(createSubCategoryValidator, subCategoryController.createSubCategory);
    //.get(categoryController.getCategories);
// router.route('/:id')
//     .get(getCategoryValidator, categoryController.getCategoryByID)
//     .put(updateCategoryValidator, categoryController.updateCategory)
//     .delete(deleteCategoryValidator, categoryController.deleteCategoryByID);

module.exports = router;