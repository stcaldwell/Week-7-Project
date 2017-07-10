const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
// Replace "test" with your database name.
mongoose.connect('mongodb://localhost:27017/statstrackdb');
