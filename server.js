// Import npm packages

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Data parsing
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, }
    );
    const connection = mongoose.connection;

    connection.once('open', () => {
        console.log('MongoDB database connection established successfully');
    })

const exercisesRouter = require('./backend/routes/exercises');
const usersRouter = require('./backend/routes/users')

// HTTP request logger
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('backend/build'));
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});