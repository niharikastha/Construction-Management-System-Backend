
const mongoose = require('mongoose');
const constructorSchema = new mongoose.Schema({
    // projectid: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Project',
    //     required: true
    // },
    constructor: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    constructionName: {
        type: String,
        required: true

    },
    assignment: {
        type: String,
        required: true

    },
    price: {
        type: Number,
        default: 0,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true

    },
    startDate: {
        type: String,
        default: new Date()
    },
    dueDate: {
        type: String,
        default: new Date()
    },
    // blueprint: {
    //     type: String,
        // required: true,

    // },


});

const Constructor = mongoose.model('Constructor', constructorSchema);

module.exports = Constructor;
