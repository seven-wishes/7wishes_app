const express = require('express');
const router = express.Router();
const cors = require('cors');
const articlesController = require("../controllers/articles.controller");

const corsOptions = {
    origin: true,
    credentials: true
}

router.get('', cors(corsOptions), articlesController.getArticles);
router.post('', cors(corsOptions), articlesController.createArticle);
router.post('/answer', cors(corsOptions), articlesController.answerArticle);

module.exports = router;
