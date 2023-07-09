const { app, PORT } = require('./middleware');
const { sesh } = require('./session');

require('./handlebars');
require('./controllers');

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}!`);
    sequelize.sync({ force: false });
});