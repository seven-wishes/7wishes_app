const express = require('express');
const router = express.Router();
const cors = require('cors');
const authController = require("../controllers/auth.controller");

const corsOptions = {
    origin: true,
    credentials: true
}

router.post('', cors(corsOptions), authController.login);
router.get('', cors(corsOptions), authController.checkAuthorization);
router.get('/logout', cors(corsOptions), authController.logout);
router.post('/forgot', cors(corsOptions), authController.forgotPassword);

module.exports = router;
