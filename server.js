const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 9001;

const sequelize = require('./config/connection');