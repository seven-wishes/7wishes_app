const express = require('express');
const router = express.Router();
const cors = require('cors');
const userController = require("../controllers/users.controller");

const corsOptions = {
    origin: true,
    credentials: true
}

router.get('/list/:gender_id/:page', cors(corsOptions), userController.getAccounts);
router.post('/setfilter', cors(corsOptions), userController.setMultipleFilters);
router.get('/account/:id', cors(corsOptions), userController.getUser);
router.post('/create', cors(corsOptions), userController.createUser);
router.put('/update', cors(corsOptions), userController.updateUser);
router.delete('/:id', cors(corsOptions), userController.deleteUser);

module.exports = router;
