//entry point to server
//bring in express
//common js, must bring in module this way because we don't have Babel
const express = require('express');
const app = express();

const connectDB = require('./config/db');

//GET response for home page '/' route 
app.get('/',function(req, res) {
    return res.json({ msg: "Welcome to the Contact Keeper API..."})
});


//Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));



const PORT = process.env.PORT ||  5000;

//listen method listens on the port provided
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));




