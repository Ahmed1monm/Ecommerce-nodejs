const express = require('express');
const categoryController = require('../services/categoryController');

const router = express.Router();

//router.post("/",categoryController.createCategory );
router.route("/").post(categoryController.createCategory);

module.exports = router;