const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const CATEGORIES_MODEL = require("./models/category.model");
const GALLERY_MODEL = require("./models/gallery.model");

const express = require('express');
const galleryModel = require("./models/gallery.model");
const app = express();
mongoose.connect('mongodb+srv://tranhoangduy:tranhoangduy@node-libary.udy8w.mongodb.net/duykaka?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
    });


//app.use(express.static('public', { index: 'index.html' }));
app.get('/', async (req, res) => {
    return res.status(200).json({ error: false, data: 'kiên kaka fake nè vlo', message: 'get_successed' })
})
app.get('/categories', async (req, res) => {
    const signalGetList = await CATEGORIES_MODEL.find({}).sort({ name: 1 })
    return res.status(200).json({ error: false, data: signalGetList, message: 'get_successed' })
})

app.get('/categories/:id', async (req, res) => {
    const id = req.params.id;
    const signalGetList = await CATEGORIES_MODEL.findOne({ _id: id });
    return res.status(200).json({ error: false, data: signalGetList, message: 'get_successed' })
})

app.get('/galleries', async (req, res) => {
    const categoryID = req.query.category;
    let conditions = {};
    if (categoryID) {
        conditions.categories = { $in: [categoryID] }
    }
    const signalGetList = await GALLERY_MODEL.find(conditions).populate('categories').sort({ name: 1 })
    return res.status(200).json({ error: false, data: signalGetList, message: 'get_successed' })
})

app.get('/galleries/:id', async (req, res) => {
    const id = req.params.id;
    const signalGetList = await GALLERY_MODEL.findOne({ _id: id }).populate('categories');
    return res.status(200).json({ error: false, data: signalGetList, message: 'get_successed' })
})

// app.listen(3000, () => {
//     console.log('Server listening on port 3000');
// });

//connect db
// mongoose.connect("mongodb://localhost:27017/kienkaka", {}, async (err) => {
//     if (!err) {
//         console.log("MongoDB Connection Succeeded.");
//     } else {
//         console.log("Error in DB connection: " + err);
//     }
// });
app.listen(5000, () => {
    console.log('Server listening on port 5000');
});

