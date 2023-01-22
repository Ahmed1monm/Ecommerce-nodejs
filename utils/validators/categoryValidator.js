const { check } = require('express-validator');
const validationMiddelware = require('../../middlewares/validator');

exports.getCategoryValidator = [
    check('id').isMongoId().withMessage("Invalid mongo ID format"), // Rule
    validationMiddelware // Validator Middelware

]
