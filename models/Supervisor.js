
const mongoose = require('mongoose');
const SupervisorSchema = new mongoose.Schema({
   
    supervisorId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true

    },
    assignment: {
        type: String,
        required: true

    },
    description: {
        type: String,
        required: true,
        trim: true

    },
    task: {
        type: String,
        default: false,
        required: true
    },
    blueprint: {
        type: String,
        // required: true,

    }


});

const Supervisor = mongoose.model('Supervisor', SupervisorSchema);

module.exports = Supervisor;
