var mongoose = require("mongoose");
var Schema   = mongoose.Schema;
var Comment = require("./Comment");

var ArticleSchema = new Schema();
ArticleSchema.add({
    title: String,
    slug: String,
    content: String,
    author: String,
    intime: { type: Date, default: Date.now }
});
mongoose.model('Article', ArticleSchema);