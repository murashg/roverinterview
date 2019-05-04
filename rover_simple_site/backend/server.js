const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dbRoutes = express.Router();
const sitterRoutes = express.Router();
const ownerRoutes = express.Router();
const appointmentRoutes = express.Router();
const PORT = 4000;

let Sitter = require('./models/sitters.model');
let Owner = require('./models/owners.model');
let Appointment = require('./models/appointments.model');
let RoverDB = require('./models/db.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/roverdb', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

dbRoutes.route('/').get(function(req, res) {
  RoverDB.find(function(err, db) {
    if (err) {
      console.log(err);
    } else {
      res.json(db);
    }
  });
});

sitterRoutes.route('/add').post(function(req, res) {
  let sitter = new Sitter(req.body);
  sitter.save()
        .then(sitter => {
          res.status(200).json({'sitter': 'sitter added successfully'});
        })
        .catch(err => {
          res.status(400).send('adding new sitter failed');
        });
});

sitterRoutes.route('/').get(function(req, res) {
  Sitter.find(function(err, sitters) {
    if (err) {
      console.log(err);
    } else {
      res.json(sitters);
    }
  });
});

sitterRoutes.route('/:id').get(function(req, res) {
  let id = req.params.id;
  Sitter.findOne({sitter_email:id}, function(err, sitter) {
    res.json(sitter);
  });
});

sitterRoutes.route('/update/:id').post(function(req, res) {
  Sitter.findOne({sitter_email:id}, function(err, sitter) {
    if (!sitter) {
      res.status(404).send("data is not found");
    } else {
      sitter.sitter_email = req.body.sitter_email;
      sitter.sitter_phone_number = req.body.sitter_phone_number;
      sitter.sitter_name = req.body.sitter_name;
      sitter.sitter_score = req.body.sitter_score;
      sitter.sitter_rating = req.body.sitter_rating;
      sitter.sitter_overall_rating = req.body.sitter_overall_rating;
      sitter.sitter_image = req.body.sitter_image;

      sitter.save().then(sitter => {
        res.json('Sitter updated!');
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
    }
  });
});

app.use('/db', dbRoutes);
app.use('/owners', ownerRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/sitters', sitterRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
