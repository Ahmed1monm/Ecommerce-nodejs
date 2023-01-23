const express = require('express');
const subCategoryController = require('../services/subCategoryController');
const{ createSubCategoryValidator, getSubCategoryValidator, updateSubCategoryValidator, deleteSubCategoryValidator } = require('../utils/validators/SubCategoryValidator');

const router = express.Router();

router.route("/")
    .post(createSubCategoryValidator, subCategoryController.createSubCategory)
    .get(subCategoryController.getSubCategories);
router.route('/:id')
     .get(getSubCategoryValidator , subCategoryController.getSubCategoryByID)
     .put(updateSubCategoryValidator, subCategoryController.updateSubCategory)
     .delete(deleteSubCategoryValidator, subCategoryController.deleteSubCategoryByID);

module.exports = router;