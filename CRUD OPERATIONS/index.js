const routes = require('./routes/routes.js');
const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json'); 
require('dotenv').config(); // Load environment variables from .env file


const app = express();

app.use(express.json());
app.use('/api', routes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// pass = "G6VM89piSSLHKBvU"

const mongoString = "mongodb+srv://iammysterious696:G6VM89piSSLHKBvU@cluster0.pmfqj7c.mongodb.net/test";
mongoose.connect(mongoString)
const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
app.listen(3000, () => {
    console.log(`Server Started at ${3000}`);
});

