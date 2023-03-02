const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categories = new Schema({
    name: { type: String, require: true },
    slug: { type: String },
    urlLink: { type: String }
});

module.exports = mongoose.model("categories", categories);