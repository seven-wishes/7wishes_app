const express = require('express');
const router = express.Router();
const cors = require('cors');
const dialogsController = require("../controllers/dialogs.controller");

const corsOptions = {
    origin: true,
    credentials: true
}

router.post('/create', cors(corsOptions), dialogsController.createDialog);
router.post('/check', cors(corsOptions), dialogsController.checkDialog);
router.post('/message', cors(corsOptions), dialogsController.createMessage);
router.get('/', cors(corsOptions), dialogsController.getDialogs);
router.get('/:dialog_id', cors(corsOptions), dialogsController.getDialog);
router.post('/message/delete', cors(corsOptions), dialogsController.deleteMessage);
router.post('/delete', cors(corsOptions), dialogsController.deleteDialog);

module.exports = router;
