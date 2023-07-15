const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const dotenv = require('dotenv')
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

dotenv.config();

const sesh = {
    secret: 'Ultra secret',
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

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}!`);
    sequelize.sync({ force: false });
});
