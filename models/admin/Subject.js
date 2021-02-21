const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    total_books: {
        type: Number,
        default: 0,
    }
});

module.exports = mongoose.model('Subject', SubjectSchema);