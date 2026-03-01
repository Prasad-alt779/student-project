const express = require('express');
const router = express.Router();

const { activecheck } = require('../controllers/Posts.controller');

router.get('/', activecheck);

module.exports = router;