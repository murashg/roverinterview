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

//Sitter!

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

//validate unique email
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

//owner!

ownerRoutes.route('/').get(function(req, res) {
  Owner.find(function(err, owners) {
    if (err) {
      console.log(err);
    } else {
      res.json(owners);
    }
  });
});

ownerRoutes.route('/:id').get(function(req, res) {
  let id = req.params.id;
  Owner.findOne({owner_email:id}, function(err, owner) {
    res.json(owner);
  });
});

ownerRoutes.route('/update/:id').post(function(req, res) {
  Owner.findOne({owner_email:id}, function(err, owner) {
    if (!owner) {
      res.status(404).send("data is not found");
    } else {
      owner.owner_email = req.body.owner_email;
      owner.owner_phone_number = req.body.owner_phone_number;
      owner.owner_name = req.body.owner_name;
      owner.owner_dogs = req.body.owner_dogs;
      owner.owner_pic = req.body.owner_pic;

      owner.save().then(owner => {
        res.json('Owner updated!');
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
    }
  });
});

//validate unique email
ownerRoutes.route('/add').post(function(req, res) {
  let owner = new Owner(req.body);
  owner.save()
        .then(owner => {
          res.status(200).json({'owner': 'owner added successfully'});
        })
        .catch(err => {
          res.status(400).send('adding new owner failed');
        });
});

//appointments!

appointmentRoutes.route('/').get(function(req, res) {
  Appointment.find(function(err, owners) {
    if (err) {
      console.log(err);
    } else {
      res.json(owners);
    }
  });
});

appointmentRoutes.route('/:id').get(function(req, res) {
  let id = req.params.id;
  Owner.findOne({owner_email:id}, function(err, owner) {
    res.json(owner);
  });
});

appointmentRoutes.route('/update/:id').post(function(req, res) {
  Owner.findOne({owner_email:id}, function(err, owner) {
    if (!owner) {
      res.status(404).send("data is not found");
    } else {
      owner.owner_email = req.body.owner_email;
      owner.owner_phone_number = req.body.owner_phone_number;
      owner.owner_name = req.body.owner_name;
      owner.owner_dogs = req.body.owner_dogs;
      owner.owner_pic = req.body.owner_pic;

      owner.save().then(owner => {
        res.json('Owner updated!');
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
    }
  });
});

//validate unique email
appointmentRoutes.route('/add').post(function(req, res) {
  let sFlag = false;
  Sitter.findOne({sitter_email:req.body.appointment_sitter}, function(err, sitter) {
    if (!sitter){
      res.status(400).send("sitter is not found");
    } else {
      req.body.appointment_sitter = sitter._id;
      sFlag = true;
      Owner.findOne({owner_email:req.body.appointment_owner}, function(err, owner) {
        if (!owner){
          res.status(400).send("owner is not found");
        } else {
          req.body.appointment_owner = owner._id;
          if (sFlag){
            let appointment = new Appointment(req.body);
            appointment.save()
                  .then(appointment => {
                    res.status(200).json({'appointment': 'appointment added successfully'});
                    sitter.sitter_history.push(appointment._id);
                    sitter.sitter_rating = (appointment.appointment_rating + sitter.sitter_rating * sitter.sitter_stays) / (sitter.sitter_stays + 1);
                    sitter.sitter_stays = sitter.sitter_stays + 1;
                    sitter.save()
                          .then(sitter => {
                            res.status(200).json({'sitter': 'sitter history updated'});
                          })
                          .catch(err => {
                            res.status(400).send('updating sitter history failed');
                          });
                    owner.owner_history.push(appointment._id);
                    owner.save()
                          .then(owner => {
                            res.status(200).json({'owner': 'owner history updated'});
                          })
                          .catch(err => {
                            res.status(400).send('updating owner history failed');
                          });

                  })
                  .catch(err => {
                    res.status(400).send('adding new appointment failed');
                  });
          } else {
            res.status(404).send("Appointment not created");
          }
        }
      });
    }
  });
  /*
  Owner.findOne({owner_email:req.body.appointment_owner}, function(err, owner) {
    if (!owner){
      //res.status(400).send("owner is not found");
    } else {
      req.body.appointment_owner = owner._id;

    }
  });
  console.log(req.body);
  console.log(oFlag);
  console.log(sFlag);

  if (oFlag && sFlag){
    let appointment = new Appointment(req.body);
    appointment.save()
          .then(owner => {
            res.status(200).json({'appointment': 'appointment added successfully'});
          })
          .catch(err => {
            res.status(400).send('adding new appointment failed');
          });
  } else {
    res.status(404).send("Appointment not created");
  }
  */
});

app.use('/db', dbRoutes);
app.use('/owners', ownerRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/sitters', sitterRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
