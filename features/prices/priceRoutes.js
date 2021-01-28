const express = require('express');
const { check, validationResult } = require('express-validator');
const { fieldsValidator } = require('../../middlewares/fields-validator');
const { createPrice, getPrices, getPrice } = require('./priceAppService');

/*
    Event Routes
    host + /api/categories
*/

const router = express.Router();

router.post("/",
    createPrice);

router.get("/", getPrices);

router.get("/:id", getPrice);

module.exports = router