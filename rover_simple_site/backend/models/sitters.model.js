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
    sitter_overall_rating_view: {
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
    sitter_history: [{
        appointment_history: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Appointment'
        }
    }]
});

SitterSchema.pre("save", function(next) {
  console.log("im in pre save");
    if (this.sitter_stays >= 10) {
      this.sitter_overall_rating = this.sitter_rating;
    } else {
      this.sitter_overall_rating = (this.sitter_score * ((10 - this.sitter_stays) / 10)) + (this.sitter_rating * (this.sitter_stays / 10));
    }
    this.sitter_overall_rating_view = this.sitter_overall_rating.toFixed(1)
    next();
});

module.exports = mongoose.model('Sitter', SitterSchema);
