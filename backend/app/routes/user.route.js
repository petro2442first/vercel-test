const express = require("express");

const router = express.Router();

router.route('/auth').get(async function(req, res) {
    return res.send('auth');
});

module.exports = router;