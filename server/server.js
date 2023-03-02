const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const mongoose = require('mongoose');

//middleware
app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//database connection

mongoose.connect(process.env.DB_LINK)
    .then(() => console.log('database is connected'))
    .catch((err) => console.log(err))

//routes

//run server on PORT
const server = app.listen(PORT, () => {
    console.log("listening on port " + PORT);
});