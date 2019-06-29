const express = require('express');
const router= express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const JWT_EXPIRATION= 360000;
// validates inputs
const { check, validationResult } = require('express-validator');
const User = require('../models/User');


// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get('/', (req, res) => {
    res.send('Get logged in user');
});


// @route     POST api/auth
// @desc      Auth user & get token
// @access    Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
    ],
    async (req, res) => {
      const errors = validationResult(req);

      // invalide credentials error
      if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    
      const { email, password } = req.body;
      
      try {
        //look for user
        let user = await User.findOne({ email });
        
        // if user doesn't exist, return 400 and message
        if(!user) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        //compare passwords with user provided password
        const isMatch = await bcrypt.compare(password, user.password);
        
        //if password doen't match, return 400 and message
        if(!isMatch) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        // signs JWT payload with secret and expires in one hour if credentials are valid
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: JWT_EXPIRATION
        }, (err, token) => {
            if(err) {
                throw err;
            }
            res.json({ token });
        });
    } 
    catch(err) {
        console.err(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;