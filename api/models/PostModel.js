var mongoose = require("../database")();

var PostSchema = new mongoose.Schema({
    title: String,
    text: String,
    favorite: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    hidden: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Post', PostSchema);
