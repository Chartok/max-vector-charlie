const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('../config/connection');

const sessionSecret = process.env.SESSION_SECRET;
const sesh = {
    secret: sessionSecret,
    cookie: {
        // Session will automatically expire in 10 minutes
        expires: 10 * 60 * 1000,
        httpOnly: true,
        secure: false,
        maxAge: null,
        sameSite: 'strict'
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sesh));