const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.json({
        ok: true,
        Message: 'Hola Mundo Products',
        Data: null
    });
});

module.exports = router;