const express = require('express');
const router = express.Router();

router.use('/categories', require('./routes/categories.js'));
router.use('/stores', require('./routes/stores.js'));
router.use('/addresses', require('./routes/addresses.js'));
router.use('/products', require('./routes/products.js'));
router.use('/autoCompleteSuggestions', require('./routes/autoCompleteSuggestions'));

module.exports = router;