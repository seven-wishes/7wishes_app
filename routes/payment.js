const express = require('express');
const router = express.Router();
const cors = require('cors');
const paymentController = require("../controllers/payment.controller");

const corsOptions = {
    origin: true,
    credentials: true
}

router.post('/', cors(corsOptions), paymentController.paymentInit);
router.post('/up', cors(corsOptions), paymentController.paymentUpInit);

module.exports = router;
