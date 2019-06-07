const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'clubManager', message: 'Hi there!'});
});

module.exports = router;