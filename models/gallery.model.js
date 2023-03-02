const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const gallery = new Schema({
    name: { type: String, require: true },
    slug: { type: String, require: true },
    view: { type: Number, require: true },
    like: { type: Number, require: true },
    image: { type: String, require: true },
    urlLink: { type: String },
    sliderName: [{ type: String }],
    sliders: [{ type: String }],
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'categories' }]
});

module.exports = mongoose.model("gallery", gallery);