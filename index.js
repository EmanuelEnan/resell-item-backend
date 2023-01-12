const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const port = process.env.PORT;

const app = express();
app.use(express.urlencoded({ extended: false }));

const DB = process.env.db_name;

mongoose.connect(DB);
mongoose.Promise = global.Promise;

app.use(express.json());

// app.get('/api', (req, res) => res.send('API working'),);
app.use('/api', require('./routes/api'));

app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message });
});

app.listen(port, () => {
    console.log(`listening at port ${port}...`);
}
);