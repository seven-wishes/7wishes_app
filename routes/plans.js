const express = require('express');
const router = express.Router();
const cors = require('cors');
const plansController = require("../controllers/plans.controller");

const corsOptions = {
    origin: true,
    credentials: true
}

router.get('/:gender_id', cors(corsOptions), plansController.getPlans);

module.exports = router;
