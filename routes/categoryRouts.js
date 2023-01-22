const express = require('express');
const categoryController = require('../services/categoryController');
const{ getCategoryValidator} = require('../utils/validators/categoryValidator');
const router = express.Router();

router.route("/").post(categoryController.createCategory).get(categoryController.getCategories);
router.route('/:id')
    .get(getCategoryValidator, categoryController.getCategoryByID)
    .put(categoryController.updateCategory)
    .delete(categoryController.deleteCategoryByID);

module.exports = router;