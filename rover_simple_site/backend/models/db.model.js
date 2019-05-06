const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let RoverDbSchema = new Schema({
    db_owners: [{
      db_owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner'
      }
    }],
    db_sitters: [{
      db_sitter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sitter'
      }
    }],
    db_appointments: [{
      db_appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
      }
    }]
});
module.exports = mongoose.model('RoverDB', RoverDbSchema);
