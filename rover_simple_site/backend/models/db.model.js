const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let RoverDbSchema = new Schema({
    owners: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Owner'
    }],
    sitters: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sitter'
    }],
    appointments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment'
    }]
});
module.exports = mongoose.model('RoverDB', RoverDbSchema);
