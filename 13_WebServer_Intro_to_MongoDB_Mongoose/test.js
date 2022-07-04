const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3600;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log('Connected');
    } catch (err) {
        console.log('no connected');
        console.error(err);
    }
};

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
mongoose.connection.on('connected', () => console.log('Connected'));
mongoose.connection.on('error', () => console.log('Connection failed with - ', err));
