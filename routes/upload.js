const express = require('express');
const router = express.Router();
const cors = require('cors');
const uploadController = require("../controllers/upload.controller");

const corsOptions = {
    origin: true,
    credentials: true
}

router.post('/', cors(corsOptions), uploadController.uploadPhoto);
router.post('/gallery', cors(corsOptions), uploadController.uploadGallery);

module.exports = router;
