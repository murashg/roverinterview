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
const fs = require('fs');


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

handleGetRequest(dbRoutes, RoverDB);
handleGetRequest(ownerRoutes, Owner);
handleGetRequest(appointmentRoutes, Appointment);

handleGetIdRequest(sitterRoutes, Sitter);
handleGetIdRequest(ownerRoutes, Owner);
handleGetIdRequest(appointmentRoutes, Appointment);

handleAddRequest(sitterRoutes, Sitter, 'sitter', 'db_sitters');
handleAddRequest(ownerRoutes, Owner, 'owner', 'db_owners');
/*
async function getSitterId(sitter){
  return await Sitter.findOne({sitter_email: sitter.sitter_email},function(err, s){
    console.log(s);
    if (!s){
       return saveSitter(sitter);
    }else{
      return s._id;
    }
  });
}
async function saveSitter(sitter){
  var s_id;
  console.log('not found');
  let newSitter = new Sitter(sitter);
  await newSitter.save()
                 .then(function(newS) {
                   s_id = newS._id;
                 })
                 .catch(err => {
                   console.log(err);
                 });
  return s_id;

}

async function processLine(line){
  var sitter = {
    sitter_rating: line[0],
    sitter_image: line[1],
    sitter_bio: line[3],
    sitter_name: line[6],
    sitter_phone_number: line[9],
    sitter_email: line[10]
  }
  var owner = {
    owner_bio: line[3],
    owner_image: line[4],
    owner_dogs: line[5].split('|'),
    owner_name: line[7],
    owner_phone_number: line[11],
    owner_email: line[12]
  }
  var appointment = {
    appointment_sitter: '',
    appointment_owner: '',
    appointment_endDate: line[2],
    appointment_text: line[3],
    appointment_startDate: line[8]
  }
  //does sitter exist ? save sitter and get id : get sitter_id
  //does owner exist ? save owner and get id : get owner_id
  //create appointment between sitter and owner
  var s_id;
  s_id = await getSitterId(sitter);
  console.log(s_id);
}
*/

function calcSitterScore(s) {
  let set = new Set();
  for (var i = 0; i < s.length; i++){
    set.add(s.charAt(i));
  }
  return 5 * (set.size / 26);
}

function addToDB(words) {
  var line = words.split(",");
  var sitter = {
    sitter_rating: 0,
    sitter_image: line[1],
    sitter_bio: line[3],
    sitter_name: line[6],
    sitter_phone_number: line[9],
    sitter_email: line[10],
    sitter_history: [],
    sitter_score: Number,
    sitter_overall_rating: Number,
    sitter_stays: 0
  }
  sitter.sitter_score = calcSitterScore(sitter.sitter_name);
  sitter.sitter_overall_rating = sitter.sitter_score;
  var owner = {
    owner_bio: line[3],
    owner_image: line[4],
    owner_dogs: line[5].split('|'),
    owner_name: line[7],
    owner_phone_number: line[11],
    owner_email: line[12],
    owner_history: []
  }
  var appointment = {
    appointment_rating: line[0],
    appointment_sitter: '',
    appointment_owner: '',
    appointment_endDate: line[2],
    appointment_text: line[3],
    appointment_startDate: line[8]
  }
  //omg why does javascript operate everything async.
  //I know why, but I'm just not familiar enough with callbacks to handle this yet.
  //please give me coroutines.

  //does sitter exist ? save sitter and get id : get sitter_id
  //does owner exist ? save owner and get id : get owner_id
  //create appointment between sitter and owner
  /*
  var s_id;
  s_id = await getSitterId(sitter);
  console.log(s_id);
  var o_id;
  */
  Owner.findOne({owner_email: owner.owner_email}, function(err, o){
    if (!o){
      let newOwner = new Owner(owner);
      newOwner.save()
              .then(newOwner => {
                //pushToRoverDB(newOwner, 'db_owners');
                Sitter.findOne({sitter_email: sitter.sitter_email}, function(err, s){
                  if (!s){
                    let newSitter = new Sitter(sitter);
                    newSitter.save()
                            .then(newSitter => {
                              //pushToRoverDB(newSitter,'db_sitters');
                              appointment.appointment_sitter = newSitter._id;
                              appointment.appointment_owner = newOwner._id;
                              let newAppointment = new Appointment(appointment);
                              newAppointment.save()
                                            .then(newAppointment => {
                                              newSitter.sitter_history.push(newAppointment._id);
                                              newSitter.sitter_rating = (newAppointment.appointment_rating + newSitter.sitter_rating * newSitter.sitter_stays) / (newSitter.sitter_stays + 1);
                                              newSitter.sitter_stays = newSitter.sitter_stays + 1;
                                              newSitter.save()
                                                    .then(sitter2 => {
                                                      //console.log('done');
                                                    })
                                                    .catch(err => {
                                                      console.log(err);
                                                    });
                                              newOwner.owner_history.push(newAppointment._id);
                                              newOwner.save()
                                                    .then(owner2 => {
                                                      //console.log('done2');
                                                    })
                                                    .catch(err => {
                                                      console.log(err);
                                                    });
                                              //pushToRoverDB(newAppointment,'db_appointments');
                                            })
                                            .catch(err => {
                                              console.log(err);
                                            });
                            })
                            .catch(err => {
                              console.log(err);
                            });
                  } else {
                    appointment.appointment_sitter = s._id;
                    appointment.appointment_owner = newOwner._id;
                    let newAppointment = new Appointment(appointment);
                    newAppointment.save()
                                  .then(newAppointment => {
                                    s.sitter_history.push(newAppointment._id);
                                    s.sitter_rating = (newAppointment.appointment_rating + s.sitter_rating * s.sitter_stays) / (s.sitter_stays + 1);
                                    s.sitter_stays = s.sitter_stays + 1;
                                    s.save()
                                          .then(sitter2 => {
                                            //console.log('done');
                                          })
                                          .catch(err => {
                                            console.log(err);
                                          });
                                    newOwner.owner_history.push(newAppointment._id);
                                    newOwner.save()
                                          .then(owner2 => {
                                            //console.log('done2');
                                          })
                                          .catch(err => {
                                            console.log(err);
                                          });
                                    //pushToRoverDB(newAppointment,'db_appointments');
                                  })
                                  .catch(err => {
                                    console.log(err);
                                  });
                  }
                });
              })
              .catch(err => {
                console.log(err);
              });
    } else {
      Sitter.findOne({sitter_email: sitter.sitter_email}, function(err, s){
        if (!s){
          let newSitter = new Sitter(sitter);
          newSitter.save()
                  .then(newSitter => {
                    //pushToRoverDB(newSitter,'db_sitters');
                    appointment.appointment_sitter = newSitter._id;
                    appointment.appointment_owner = o._id;
                    let newAppointment = new Appointment(appointment);
                    newAppointment.save()
                                  .then(newAppointment => {
                                    newSitter.sitter_history.push(newAppointment._id);
                                    newSitter.sitter_rating = (newAppointment.appointment_rating + newSitter.sitter_rating * newSitter.sitter_stays) / (newSitter.sitter_stays + 1);
                                    newSitter.sitter_stays = newSitter.sitter_stays + 1;
                                    newSitter.save()
                                          .then(sitter2 => {
                                            //console.log('done');
                                          })
                                          .catch(err => {
                                            console.log(err);
                                          });
                                    o.owner_history.push(newAppointment._id);
                                    o.save()
                                          .then(owner2 => {
                                            //console.log('done2');
                                          })
                                          .catch(err => {
                                            console.log(err);
                                          });
                                    //pushToRoverDB(newAppointment,'db_appointments');
                                  })
                                  .catch(err => {
                                    console.log(err);
                                  });
                  })
                  .catch(err => {
                    console.log(err);
                  });
        } else {
          appointment.appointment_sitter = s._id;
          appointment.appointment_owner = o._id;
          let newAppointment = new Appointment(appointment);
          newAppointment.save()
                        .then(newAppointment => {
                          //console.log(newAppointment);
                          //console.log(s);
                          s.sitter_history.push(newAppointment._id);
                          s.sitter_rating = (newAppointment.appointment_rating + s.sitter_rating * s.sitter_stays) / (s.sitter_stays + 1);
                          s.sitter_stays = s.sitter_stays + 1;
                          s.save()
                                .then(sitter2 => {
                                  //console.log('done');
                                })
                                .catch(err => {
                                  console.log(err);
                                });
                          o.owner_history.push(newAppointment._id);
                          o.save()
                                .then(owner2 => {
                                  //console.log('done2');
                                })
                                .catch(err => {
                                  console.log(err);
                                });
                          //pushToRoverDB(newAppointment,'db_appointments');
                        })
                        .catch(err => {
                          console.log(err);
                        });
        }
      });
    }
  });
}

dbRoutes.route('/initialize').post(function(req, res) {
  let db = new RoverDB();
  db.save()
    .then(async () => {
      var data = fs.readFileSync('reviews.csv');
      var lines = data.toString().split(/\r?\n/).slice(1);
      lines = lines.slice(0,lines.length-1);
      for (const words of lines){
        await addToDB(words);
      }
    })
    .catch(err => {
      res.status(400).send('db initialization failed');
    });
  console.log('done');
});

ownerRoutes.route('/search/:search').get(function(req, res) {
  Owner.find( { $text: { $search : req.params.search } },
              { score : { $meta: 'textScore' } } )
        .sort( {
          score: { $meta : 'textScore' }
        } )
        .exec(function(err, model) {
          if (err){
            console.log(err);
          }else{
            res.json(model);
          }
        });
})

sitterRoutes.route('/').get(function(req, res) {
  Sitter.find({
    // Search Filters
  },
  ['sitter_image','sitter_name','sitter_rating_rounded', 'sitter_email', 'sitter_phone_number', 'sitter_bio'], // Columns to Return
  {
    skip:0, // Starting Row
    limit:10, // Ending Row
    sort:{
        sitter_overall_rating: -1 //Sort by Date Added DESC
    }
  },
  function(err, model) {
    if (err) {
      console.log(err);
    } else {
      res.json(model);
    }
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
      sitter.sitter_bio = req.body.sitter_bio;

      sitter.save().then(sitter => {
        res.json('Sitter updated!');
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
    }
  });
});

ownerRoutes.route('/email/:email').get(function(req, res) {
  Owner.findOne({owner_email:req.params.email}, function(err, owner) {
    if (!owner) {
      res.status(404).send("data is not found");
    } else {
      res.json(owner);
    }
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
      owner.owner_bio = req.body.owner_bio;

      owner.save().then(owner => {
        res.json('Owner updated!');
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
    }
  });
});

appointmentRoutes.route('/').get(function(req, res) {
  Appointment.find({
      // Search Filters
    },
    null, // Columns to Return
    {
      skip:0, // Starting Row
      limit:10, // Ending Row
    })
    .populate('appointment_sitter')
    .populate('appointment_owner')
    .exec(
      function(err, model) {
        if (err) {
          console.log(err);
        } else {
          res.json(model);
        }
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

//custom add for appointments because it updates other schema
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
                    pushToRoverDB(appointment,'db_appointments');
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
});

app.use('/db', dbRoutes);
app.use('/owners', ownerRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/sitters', sitterRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});


function handleGetRequest(route, schema){
  route.route('/').get(function(req, res) {
    schema.find(function(err, model) {
      if (err) {
        console.log(err);
      } else {
        res.json(model);
      }
    });
  });
};

function handleGetIdRequest(route, schema){
  route.route('/:id').get(function(req, res) {
    let id = req.params.id;
    schema.findOne({_id:id}, function(err, model) {
      res.json(model);
    });
  });
};

function handleAddRequest(route, schema, name, accessor){
  route.route('/add').post(function(req, res) {
    let model = new schema(req.body);
    model.save()
          .then(model => {
            res.status(200).json({name: name+' added successfully'});
            pushToRoverDB(model, accessor);
            let modelName = name + '_name';
            let modelEmail = name + '_email';
            //schema.index({modelName: 'text'});
            //schema.index({modelEmail: 'text'});
          })
          .catch(err => {
            console.log(err);
          });
  });
};

function pushToRoverDB(model,accessor){
  RoverDB.findById("5cd065b0004c754dc88e86ba", function(err, db) {
    if (err) {
      console.log(err);
    } else {
      db[accessor].push(model._id);
      db.save()
    }
  });
};
