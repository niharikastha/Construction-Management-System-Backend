const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectManagerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    projectName: {
        type: String,
        required: true

    },
    projectPic: {
        type: String,
        // required: true,
      
    },
    location: {
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
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
