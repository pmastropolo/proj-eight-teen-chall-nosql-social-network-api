const express = require('express');     // IMPORT EXPRESS
const mongoose = require("mongoose");   // IMPORT MONGOOSE

// SET UP EXPRESS APP
const app = express();
const PORT = process.env.PORT || 3001;

// MIDDLEWARE FOR PARSING JSON AND FORM DATA
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

