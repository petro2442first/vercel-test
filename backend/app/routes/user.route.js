import express from "express";
import { MorApi } from "../libs/mor-api";

const router = express.Router();

router.route('/auth/login').post(async function(request, response) {
    const { body: { username, password } } = request;
    const morRequest = await MorApi.login({ username, password });
    
    return response.send(morRequest);
});

router.route('/auth/logout').post(async function(request, response) {
    const { body: { username } } = request;
    const morRequest = await MorApi.logout({ username });
    
    return response.send(morRequest);
});

router.route('/quickstat').post(async function(request, response) {
    const { body: { username } } = request;
    const morRequest = await MorApi.getQuickStat({ username });
    
    return response.send(morRequest);
});


export default router;