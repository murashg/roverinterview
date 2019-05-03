const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let AppointmentSchema = new Schema({
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Owner'
    },
    sitter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sitter'
    },
    rating: {
      type: Double
    },
    sitterImage: {
      type: String
    },
    startDate: {
      type: String
    },
    endDate: {
      type: String
    },
    text: {
      type: String
    }
});
module.exports = mongoose.model('Appointment', AppointmentSchema);
