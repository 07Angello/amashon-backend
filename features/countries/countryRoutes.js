const express = require('express');
const { check, validationResult } = require('express-validator');
const { fieldsValidator } = require('../../middlewares/fields-validator');
const { createCountry, getCountries, getCountry } = require('./countryAppService');

/*
    Event Routes
    host + /api/categories
*/

const router = express.Router();

router.post("/",
    [
        check("descriptionEN", "The English Description can not be null or empty.").not().isEmpty(),
        check("descriptionES", "The Spanish Description can not be null or empty").not().isEmpty(),
        fieldsValidator
    ],
    createCountry);

router.get("/", getCountries);

router.get("/:id", getCountry);

module.exports = router