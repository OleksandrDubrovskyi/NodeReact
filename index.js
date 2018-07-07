const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./models/User');
require('./services/passport');

//Connect to the database at mlab.com
mongoose.connect(keys.mongoURI);

const app = express();

//Make our app use cookies
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
//Call passport to use cookies
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRouth')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT);


//https://git.heroku.com/pacific-cliffs-65989.git
//https://pacific-cliffs-65989.herokuapp.com
//
//https://github.com/OleksandrDubrovskyi/NodeReact.git
