const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let OwnerSchema = new Schema({
    owner_email: {
        type: String,
        index: true
    },
    owner_phone_number: {
        type: String,
    },
    owner_name: {
        type: String,
        index: true
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
OwnerSchema.index({owner_name: 'text'});
OwnerSchema.index({owner_email: 'text'});
module.exports = mongoose.model('Owner', OwnerSchema);
