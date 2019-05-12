const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let SitterSchema = new Schema({
    sitter_email: {
        type: String,
        index: 'text'
    },
    sitter_phone_number: {
        type: String
    },
    sitter_name: {
        type: String,
        index: 'text'
    },
    sitter_overall_rating: {
        type: Number,
        index: -1
    },
    sitter_rating_rounded: {
        type: Number
    },
    sitter_rating: {
        type: Number
    },
    sitter_score: {
        type: Number
    },
    sitter_image: {
        type: String
    },
    sitter_stays: {
        type: Number
    },
    sitter_bio: {
      type: String
    },
    sitter_history: [{
        appointment_history: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Appointment'
        }
    }]
});
/*
SitterSchema.index({sitter_overall_rating: -1});
SitterSchema.index({sitter_name: 'text'});
SitterSchema.index({sitter_email: 'text'});
*/
SitterSchema.pre("save", function(next) {
  console.log("im in pre save");
  SitterSchema.index({sitter_overall_rating: -1});
  SitterSchema.index({sitter_name: 'text', sitter_email: 'text'});
  SitterSchema.index({sitter_email: 'text'});
    if (this.sitter_stays >= 10) {
      this.sitter_overall_rating = this.sitter_rating;
    } else {
      this.sitter_overall_rating = (this.sitter_score * ((10 - this.sitter_stays) / 10)) + (this.sitter_rating * (this.sitter_stays / 10));
    }
    this.sitter_rating_rounded = this.sitter_rating.toFixed(2);
    next();
});

module.exports = mongoose.model('Sitter', SitterSchema);
