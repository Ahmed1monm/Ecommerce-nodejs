const { check } = require('express-validator');
const validationMiddelware = require('../../middlewares/validator');

exports.getCategoryValidator = [
    check('id').isMongoId().withMessage("Invalid mongo ID format"), // Rule
    validationMiddelware // Validator Middelware
]

exports.createCategoryValidator =[
    check('name')
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({min:3})
    .withMessage("Category name is too short")
    .isLength({max: 32})
    .withMessage("Category name is too Long"),
    validationMiddelware
]


exports.updateCategoryValidator = [
    check('id').isMongoId().withMessage("Invalid mongo ID format"), // Rule
    validationMiddelware // Validator Middelware
]


exports.deleteCategoryValidator = [
    check('id').isMongoId().withMessage("Invalid mongo ID format"), // Rule
    validationMiddelware // Validator Middelware
]
