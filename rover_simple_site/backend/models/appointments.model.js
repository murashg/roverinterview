const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let AppointmentSchema = new Schema({
    appointment_owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Owner'
    },
    appointment_sitter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sitter'
    },
    appointment_rating: {
      type: Number
    },
    appointment_sitterImage: {
      type: String
    },
    appointment_startDate: {
      type: String
    },
    appointment_endDate: {
      type: String
    },
    appointment_text: {
      type: String
    }
});
module.exports = mongoose.model('Appointment', AppointmentSchema);
