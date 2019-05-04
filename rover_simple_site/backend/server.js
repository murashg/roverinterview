const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dbRoutes = express.Router();
const ownerRoutes = express.Router();
const sitterRoutes = express.Router();
const appointmentRoutes = express.Router();
const PORT = 4000;

let Owner = require('./models/owners.model');
let Sitter = require('./models/sitters.model');
let Appointment = require('./models/appointments.model');
let RoverDB = require('./models/db.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

dbRoutes.route('/').get(function(req, res) {
  RoverDB.find(function(err, db) {

  })
})

sitterRoutes.route('/').get(function(req, res) {
  Sitter.find(function(err, sitters) {
    if (err) {
      constole.log(err);
    } else {
      res.json(sitters);
    }
  });
});

sitterRoutes.route('/:id').get(function(req, res) {
  let id = req.params.id;
  Sitter.findById(id, function(err, sitter) {
    res.json(sitter);
  });
});

sitterRoutes.route('/update/:id').post(function(req, res) {
  Sitter.findById(req.params.id, function(err, sitter) {
    if (!sitter) {
      res.status(404).send("data is not found");
    } else {
      sitter.sitter_email = req.body.sitter_email;
      sitter.sitter_phone_number = req.body.sitter_phone_number;
      sitter.sitter_name = req.body.sitter_name;
      sitter.sitter_score = req.body.sitter_score;
      sitter.sitter_rank = req.body.sitter_rank;
      sitter.sitter_overall_rank = req.body.sitter_overall_rank;

      sitter.save().then(sitter => {
        res.json('Sitter updated!');
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
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

app.use('/db', dbRoutes);
app.use('/owners', ownerRoutes);
app.use('/sitters', sitterRoutes);
app.use('/appointments', appointmentRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
