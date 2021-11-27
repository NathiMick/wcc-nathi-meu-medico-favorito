const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send({
        title: 'API REST NodeJS do Meu Doutor Favotiro',
        version: "1.0.0"
    })
} );


router.get('/terms', (req, res) => {
    return res.json({
        message: 'Service terms',
    })
} );


module.exports = router;