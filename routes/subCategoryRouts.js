const express = require('express');
const subCategoryController= require('../services/subCategoryController');

const{ createSubCategoryValidator,getSubCategoryValidator,updateSubCategoryValidator,deleteSubCategoryValidator,} = require('../utils/validators/SubCategoryValidator');


// Get all params in all route "The whole URL to access categoryID"
const router = express.Router({mergeParams: true});

router.route("/")
    .post(subCategoryController.setCategoryIdToBody,createSubCategoryValidator, subCategoryController.createSubCategory)
    .get(subCategoryController.getSubCategories);
router.route('/:id')
     .get(getSubCategoryValidator , subCategoryController.getSubCategoryByID)
     .put(updateSubCategoryValidator, subCategoryController.updateSubCategory)
     .delete(deleteSubCategoryValidator, subCategoryController.deleteSubCategoryByID);

module.exports = router;