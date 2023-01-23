const { check } = require('express-validator');
const validationMiddelware = require('../../middlewares/validator');

exports.getSubCategoryValidator = [
    check('id').isMongoId().withMessage("Invalid mongo ID format"), // Rule
    validationMiddelware // Validator Middelware
]

exports.createSubCategoryValidator =[
    check('name')
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({min:2})
    .withMessage("SubCategory name is too short")
    .isLength({max: 32})
    .withMessage("Category name is too Long"),

    check('category')
    .notEmpty()
    .withMessage("Category name is required")
    .isMongoId().withMessage("Invalid mongo ID format"),
    validationMiddelware
]


exports.updateSubCategoryValidator = [
    check('id').isMongoId().withMessage("Invalid mongo ID format"),
    check('category')
    .notEmpty()
    .withMessage("Enter Parent Category")
    .isMongoId()
    .withMessage("Inavalid Parent Category Format"),// Rule
    validationMiddelware // Validator Middelware
]


exports.deleteSubCategoryValidator = [
    check('id').isMongoId().withMessage("Invalid mongo ID format"), // Rule
    validationMiddelware // Validator Middelware
]
