const express = require('express');
const router= express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const JWT_EXPIRATION= 360000;

// validates inputs
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// endpoint to register user
// @route     POST api/users
// @desc      Register a user
// @access    Public
router.post('/', [
    // validate the name
    check('name', 'Please add name')
    // .not() and .isEmpty() makes sure it isn't empty 
    .not()
    .isEmpty(),

    // check to see if valid email
    check('email', 'Please include a valid email').isEmail(),

    // check to see if password contains 6 or more characters
    check('password', 'Please enter a password with 6 or more characters').isLength({
        min: 6
    })
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } 
        // destructure name, email, and password from body
        const { name, email, password } = req.body;
        try {

            //check to see if user already exist
            let user = await User.findOne({ email });

            // if user exist already, return 400 and msg
            if(user) {
                return res.status(400).json({ msg: 'User already exists' });
            }

            //otherwise, create new user instance
            user = new User({ name, email, password});

            //generate salt for hashing
            const salt = await bcrypt.genSalt(10);
            
            //hash password with generated salt
            user.password = await bcrypt.hash(password, salt);

            // save the user
            await user.save();

            // use userid as payload to JWT
            const payload = {
                user: {
                    id: user.id
                }
            };

            // signs JWT payload with secret and expires in one hour
            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: JWT_EXPIRATION
            }, (err, token) => {
                if(err) {
                    throw err;
                }
                res.json({ token });
                
            });
            
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;

