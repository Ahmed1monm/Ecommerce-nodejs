const { check } = require('express-validator');
const validationMiddelware = require('../../middlewares/validator');

exports.getBrandValidator = [
    check('id').isMongoId().withMessage("Invalid mongo ID format"), // Rule
    validationMiddelware // Validator Middelware
]

exports.createBrandValidator =[
    check('name')
    .notEmpty()
    .withMessage("Brand name is required")
    .isLength({min:3})
    .withMessage("Brand name is too short")
    .isLength({max: 32})
    .withMessage("Brand name is too Long"),
    validationMiddelware
]


exports.updateBrandValidator = [
    check('id').isMongoId().withMessage("Invalid mongo ID format"), // Rule
    validationMiddelware // Validator Middelware
]


exports.deleteBrandValidator = [
    check('id').isMongoId().withMessage("Invalid mongo ID format"), // Rule
    validationMiddelware // Validator Middelware
]
