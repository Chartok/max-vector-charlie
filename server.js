const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const dotenv = require('dotenv')
const authHelper = require('./utils/auth');
const dateHelper = require('./utils/date-helper');
const sessionHelper = require('./utils/session-helper');
const sequelize = require('./config/connection');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const helpers = {
    ...authHelper,
    ...dateHelper,
    ...sessionHelper
};
    

dotenv.config();

const app = express();
const PORT = process.env.PORT;


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

const viewsDir = path.join(__dirname, 'views');
const hbs = exphbs.create({
        helpers,
        layoutsDir: path.join(viewsDir, 'layouts'),
        defaultLayout: 'main',
        partialsDir: path.join(viewsDir),
        extname: '.handlebars'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get(require('./controllers'));

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}!`);
    sequelize.sync({ force: false });
});
