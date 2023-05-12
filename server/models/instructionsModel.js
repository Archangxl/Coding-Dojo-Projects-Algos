const mongoose = require('mongoose');

const InstructionSchema = new mongoose.Schema({

    step: {
        type: String
    }

}, {timestamps: true});

const Instruction = mongoose.model('Instruction', InstructionSchema);
module.exports = Instruction;