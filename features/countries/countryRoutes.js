const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.json({
        ok: true,
        Message: 'Response from country',
        Data: null
    });
});

module.exports = router;