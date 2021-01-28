const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.json({
        ok: true,
        Message: 'Message from prices',
        Data: null
    });
});

module.exports = router;