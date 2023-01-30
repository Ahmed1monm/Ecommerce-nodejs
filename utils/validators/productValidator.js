const slugify = require('slugify');
const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validator');

// const SubCategory = require('../../models/subCategory');

exports.createProductValidator = [
  check('name')
    .isLength({ min: 3 })
    .withMessage('must be at least 3 chars')
    .notEmpty()
    .withMessage('Product required')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check('description')
    .notEmpty()
    .withMessage('Product description is required')
    .isLength({ max: 2000 })
    .withMessage('Too long description'),
  check('quantity')
    .notEmpty()
    .withMessage('Product quantity is required')
    .isNumeric()
    .withMessage('Product quantity must be a number'),
  check('sold')
    .optional()
    .isNumeric()
    .withMessage('Product quantity must be a number'),
  check('price')
    .notEmpty()
    .withMessage('Product price is required')
    .isNumeric()
    .withMessage('Product price must be a number')
    .isLength({ max: 32 })
    .withMessage('To long price'),
  check('priceAfterDiscount')
    .optional()
    .isNumeric()
    .withMessage('Product priceAfterDiscount must be a number')
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error('priceAfterDiscount must be lower than price');
      }
      return true;
    }),
    check('category')
    .notEmpty()
    .withMessage('Product must be belong to a category')
    .isMongoId()
    .withMessage('Invalid ID formate')
    // .custom((categoryId) =>
    //   Category.findById(categoryId).then((category) => {
      
    //     if (!category) {
    //       return Promise.reject(
    //         new Error(`No category for this id: ${categoryId}`)
    //       );
    //     }
    //   })
    // ),
]

exports.getProductValidator = [
  check('id').isMongoId().withMessage("Invalid mongo ID format"), // Rule
  validatorMiddleware // Validator Middelware
]


exports.updateProductValidator = [
  check('name')
  .isLength({ min: 3 })
  .withMessage('must be at least 3 chars')
  .notEmpty()
  .withMessage('Product required')
  .custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
check('description')
  .notEmpty()
  .withMessage('Product description is required')
  .isLength({ max: 2000 })
  .withMessage('Too long description'),
check('quantity')
  .notEmpty()
  .withMessage('Product quantity is required')
  .isNumeric()
  .withMessage('Product quantity must be a number'),
check('sold')
  .optional()
  .isNumeric()
  .withMessage('Product quantity must be a number'),
check('price')
  .notEmpty()
  .withMessage('Product price is required')
  .isNumeric()
  .withMessage('Product price must be a number')
  .isLength({ max: 32 })
  .withMessage('To long price'),
check('priceAfterDiscount')
  .optional()
  .isNumeric()
  .withMessage('Product priceAfterDiscount must be a number')
  .toFloat()
  .custom((value, { req }) => {
    if (req.body.price <= value) {
      throw new Error('priceAfterDiscount must be lower than price from update');
    }
    return true;
  }), // Rule
  validatorMiddleware // Validator Middelware
]


exports.deleteProductValidator = [
  check('id').isMongoId().withMessage("Invalid mongo ID format"), // Rule
  validatorMiddleware // Validator Middelware
]

