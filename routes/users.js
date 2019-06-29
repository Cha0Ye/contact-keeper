const express = require('express');
const router= express.Router();

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
    (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } 
        res.send('passed');
    }
);

module.exports = router;
// [
//     // validate the name
//     check('name', 'name is required')
//     // .not() and .isEmpty() makes sure it isn't empty 
//     .not()
//     .isEmpty(),

//     // check to see if valid email
//     check('email', 'Please include a valid email').isEmail(),

//     // check to see if password contains 6 or more characters
//     check('password', 'Please enter a pasword with 6 or more characters').isLength({
//         min: 6
//     })
//     ],
//     (req, res) => {
//         const errors = validationResult(req);
//         if(!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array });
//         }
//         res.send('passed')
//     }

