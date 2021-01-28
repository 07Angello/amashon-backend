const { Router } = require('express');
const router =  Router();

// importing routes
const products = require('../features/products/productRoutes');
const categories = require('../features/categories/categoryRoutes');

// Using routes
router.use('/products', products);
router.use('/categories', categories);

module.exports = router;
