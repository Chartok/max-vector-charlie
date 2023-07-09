const exphbs = require('express-handlebars');
const path = require('path');

const viewsDir = path.join(__dirname, 'views');

const helpers = {
    ...authHelper,
    ...dateHelper,
    ...sessionHelper
};

const hbs = exphbs.create({
    helpers,
    layoutsDir: path.join(viewsDir, 'layouts'),
    defaultLayout: 'main',
    partialsDir: path.join(viewsDir),
    extname: '.handlebars'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', viewsDir);