const express = require('express');     // IMPORT EXPRESS
const mongoose = require("mongoose");   // IMPORT MONGOOSE
const routes = require('./routes');    // IMPORT API ROUTES

// SET UP EXPRESS APP
const app = express();
const PORT = process.env.PORT || 3001;

// MIDDLEWARE FOR PARSING JSON AND FORM DATA
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// USE DEFINED API ROUTES
app.use(routes);

// CONNECT TO MONGOOSE DATABASE (FALLBACK TO LOCALHOST IF NO ENV VAR FOUND)
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/social-network", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// LISTEN TO PORT
app.listen(PORT, () => {
console.log(`App running on port ${PORT}!`);
});

