const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const app = express();
const mongoose = require('mongoose');
// console.log(process.env.DATABASE_URI2);
const PORT = process.env.PORT || 3500;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const func = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (err) {
        console.error(err);
    }
};

func();

//________Products
const productSchema = {
    code: Number,
};
const Product = mongoose.model('Products', productSchema);
//app routes -- target all articles
app.route('/products').get(function (req, res) {
    console.log('API | GET:products');

    Product.find({}, function (err, msg) {
        if (!err) {
            res.send(msg);
        } else {
            res.send(err);
            console.log('Error: GET ARTICLES \n: ' + err);
        }
    });
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
