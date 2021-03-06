const { Router } = require('express');
const router =  Router();
require('dotenv').config();
const apiPrefix = '/api';

// importing routes
const products = require('../features/products/productRoutes');
const categories = require('../features/categories/categoryRoutes');
const countries = require('../features/countries/countryRoutes');
const prices = require('../features/prices/priceRoutes');

// Using routes
router.use(`${apiPrefix}/products`, products);
router.use(`${apiPrefix}/categories`, categories);
router.use(`${apiPrefix}/countries`, countries);
router.use(`${apiPrefix}/prices`, prices);

module.exports = router;
