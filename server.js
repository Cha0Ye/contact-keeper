//bring in express
//common js, must bring in module this way because we don't have Babel
const express = require('express');

const app = express();

const PORT = process.env.PORT ||  5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// app.get('/', (req, res) => res.json({ msg: 'Welcome to the Contact Keeper API...'}));

app.get('/',function(req, res) {
    return res.json({ msg: "Welcome to the Contact Keeper API..."})
});


//Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/users', require('./routes/auth'));
app.use('/api/users', require('./routes/contacts'));
