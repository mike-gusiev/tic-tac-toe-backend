const express = require('express');
const handleTicTocToeTurn = require('../controllers/tictactoe');
const router = express.Router();

router.post('/', handleTicTocToeTurn);

module.exports = router;
