const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let OwnerSchema = new Schema({
    owner_email: {
        type: String
    },
    owner_phone_number: {
        type: String
    },
    owner_name: {
        type: String
    },
    owner_dogs: [{
      good_boy_or_girl: {
        type: String
      }
    }],
    owner_pic: {
      type: String
    },
    owner_history: [{
        appointment_history: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Appointment'
        }
    }]
});
module.exports = mongoose.model('Owner', OwnerSchema);
