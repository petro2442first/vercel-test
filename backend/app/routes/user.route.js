import express from "express";

const router = express.Router();

router.route('/auth').get(async function(req, res) {
    return res.send('auth');
});

export default router;