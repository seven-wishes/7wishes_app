const express = require('express');
const router = express.Router();
const cors = require('cors');
const appController = require("../controllers/app.controller");

const corsOptions = {
    origin: true,
    credentials: true
}

router.get('/cities', cors(corsOptions), appController.getCities);
router.get('/eye_colors', cors(corsOptions), appController.getEyeColors);
router.get('/hair_colors', cors(corsOptions), appController.getHairColors);
router.get('/goals', cors(corsOptions), appController.getGoals);

module.exports = router;
