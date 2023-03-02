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
    const apiList = {
        getListCategories: '/categories',
        getInfoCategories: '/categories/:id',
        getListGalleriesByCategories: '/galleries?category=&skip=&limit=',
        getInfoGalleriesByCategories: '/galleries/:id',
        urlLinkSliderImage: `http://66.42.56.164/images/galleries.slug/galleries.sliderName[0]`,
        urlLinkSliderImageExample: 'http://66.42.56.164/images/cute-pho-mai-que/cute-pho-mai-que-989956.jpg'
    };
    return res.status(200).json({ error: false, data: apiList, message: 'get_successed' })
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
    const { skip = 0, limit = 20 } = req.query;
    if (categoryID) {
        conditions.categories = { $in: [categoryID] }
    }
    let dataReturn = {
        skip, limit, isOver: false
    };
    const signalGetList = await GALLERY_MODEL.find(conditions).populate('categories').select({ sliders: 0, sliderName: 0 }).sort({ name: 1 }).skip(skip).limit(limit)
    const total = await GALLERY_MODEL.count(conditions);
    dataReturn.total = total;
    dataReturn.list = signalGetList;
    if (skip * limit >= total || limit >= total) {
        dataReturn.isOver = true;
    }

    return res.status(200).json({ error: false, data: dataReturn, message: 'get_successed' })
})

app.get('/galleries/:id', async (req, res) => {
    const id = req.params.id;
    const signalGetList = await GALLERY_MODEL.findOne({ _id: id }).populate('categories');
    return res.status(200).json({ error: false, data: signalGetList, message: 'get_successed' })
})

app.listen(5000, () => {
    console.log('Server listening on port 5000');
});

