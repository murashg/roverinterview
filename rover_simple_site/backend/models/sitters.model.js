const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let SitterSchema = new Schema({
    sitter_email: {
        type: String
    },
    sitter_phone_number: {
        type: String
    },
    sitter_name: {
        type: String
    },
    sitter_overall_rating: {
        type: Number
    },
    sitter_rating: {
        type: Number
    },
    sitter_score: {
        type: Number
    },
    sitter_history: [{
        appointment_history: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Appointment'
        }
    }]
});
module.exports = mongoose.model('Sitter', SitterSchema);
