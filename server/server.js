const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRouter')

//middleware
app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//database connection
mongoose.connect(process.env.DB_LINK)
.then(() => console.log('database is connected'))
.catch((err) => console.log(err))

//routes
app.use('/user', userRouter);

//run server on localhost
const server = app.listen(PORT, () => {
    console.log("listening on port " + PORT);
});