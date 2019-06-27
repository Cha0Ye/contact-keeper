const express = require('express');


const router= express.Router();

// endpoint to register user
// @route     POST api/users
// @desc      Register a user
// @access    Public
router.post('/', function(req, res) {
    return res.send('Register a user');
});

module.exports = router;