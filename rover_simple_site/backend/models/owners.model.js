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
        type: String
    }],
    owner_image: {
      type: String
    },
    owner_bio: {
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
