const express = require('express');
const { check, validationResult } = require('express-validator');
const { fieldsValidator } = require('../../middlewares/fields-validator');
const { createCategory, getCategories, getCategory } = require('./categoryAppService');

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
    createCategory);

router.get("/filtered/:searchedCategory", getCategories);

router.get("/:id", getCategory);

module.exports = router