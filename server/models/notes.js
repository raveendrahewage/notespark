const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: String,
    category: String,
    content: String,
    image: String,
    email: String,
    archived: Boolean,
    pined: Boolean,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Note', noteSchema);