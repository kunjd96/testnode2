const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add a course title']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
});

module.exports = mongoose.model('TestData', TestSchema);