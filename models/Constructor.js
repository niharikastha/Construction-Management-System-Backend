
const mongoose = require('mongoose');
const constructorSchema = new mongoose.Schema({
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
    // bluePrint: {
    //     type: String,
    //     required: false,

    // },


});

const Constructor = mongoose.model('Constructor', constructorSchema);

module.exports = Constructor;
