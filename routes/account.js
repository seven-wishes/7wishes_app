const express = require('express');
const router = express.Router();
const cors = require('cors');
const accountController = require("../controllers/account.controller");

const corsOptions = {
    origin: true,
    credentials: true
}

router.post('/create', cors(corsOptions), accountController.createAccount);
router.post('/activate', cors(corsOptions), accountController.activateAccount);
router.post('/deactivate', cors(corsOptions), accountController.deactivateAccount);
router.post('/invisibility', cors(corsOptions), accountController.setInvisible);
router.get('/invisibility/reset', cors(corsOptions), accountController.resetInvisible);
router.get('/profile', cors(corsOptions), accountController.getMyAccount);
router.post('/gallery', cors(corsOptions), accountController.deleteGalleryItem);
router.post('/update', cors(corsOptions), accountController.updateAccount);
router.post('/update/city', cors(corsOptions), accountController.updateCity);
router.post('/update/age', cors(corsOptions), accountController.updateAge);
router.post('/update/nickname', cors(corsOptions), accountController.updateNickname);
router.post('/update/description', cors(corsOptions), accountController.updateDescription);
router.post('/update/height', cors(corsOptions), accountController.updateHeight);
router.post('/update/weight', cors(corsOptions), accountController.updateWeight);
router.post('/update/eye_color', cors(corsOptions), accountController.updateEyeColor);
router.post('/update/hair_color', cors(corsOptions), accountController.updateHairColor);
router.post('/update/goal', cors(corsOptions), accountController.updateGoal);
router.post('/messages', cors(corsOptions), accountController.getNewMessagesCount);

module.exports = router;
