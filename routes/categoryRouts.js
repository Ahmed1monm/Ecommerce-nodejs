const express = require('express');
const categoryController = require('../services/categoryController');

const router = express.Router();

router.get("/",categoryController.postCategory );

module.exports = router;