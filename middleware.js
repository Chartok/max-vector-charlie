const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const dotenv = require('dotenv')

dotenv.config();

const app = express();
const PORT = process.env.PORT;