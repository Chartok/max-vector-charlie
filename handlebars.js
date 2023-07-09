const exphbs = require('express-handlebars');
const helpers = {
    ...authHelper,
    ...dateHelper,
    ...sessionHelper
};

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');