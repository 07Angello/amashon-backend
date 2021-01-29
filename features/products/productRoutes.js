const express = require('express');
const { check, validationResult } = require('express-validator');
const { fieldsValidator } = require('../../middlewares/fields-validator');
const { createProduct, getProducts, updateProduct, deleteProduct, getProduct } = require('./productAppService');
const { isGratherThanZero } = require('../../helpers/isGratherThanZero');

/*
    Event Routes
    host + /api/products
*/

const router = express.Router();

router.post("/",
    [
        check("descriptionEN", "The English Description can not be null or empty.").not().isEmpty(),
        check("descriptionES", "The Spanish Description can not be null or empty").not().isEmpty(),
        check("longDescriptionEN", "The English Long Description can not be null or empty").not().isEmpty(),
        check("longDescriptionES", "The Spanish Long Description can not be null or empty").not().isEmpty(),
        check("image", "The Status can not be null or empty").not().isEmpty(),
        check("brand", "The Brand can not be null or empty").not().isEmpty(),
        fieldsValidator
    ],
    createProduct);

router.get("/filtered/:searchedProduct/:searchedCountry", getProducts);

router.put("/:id",
    [
        check("descriptionEN", "The Description can not be null or empty.").not().isEmpty(),
        check("descriptionES", "The Description can not be null or empty").not().isEmpty(),
        check("longDescriptionEN", "The Long Description can not be null or empty").not().isEmpty(),
        check("longDescriptionES", "The Long Description can not be null or empty").not().isEmpty(),
        check("image", "The Status can not be null or empty").not().isEmpty(),
        fieldsValidator
    ],
    updateProduct);

router.delete("/:id", deleteProduct);

router.get("/:id", getProduct);

module.exports = router