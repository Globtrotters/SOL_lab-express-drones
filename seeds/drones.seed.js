// Iteration #1
const mongoose = require('mongoose');
const Drone = require('../models/Drone.model');

const drones = [
	{ name: 'Creeper XL 500', propellers: 3, maxSpeed: 12 },
	{ name: 'Racer 57', propellers: 4, maxSpeed: 20 },
	{ name: 'Courier 3000i', propellers: 6, maxSpeed: 18 }
];

require('./../db/index.js');

Drone.insertMany(drones)
.then((drones) => {
	console.log(`${drones.length} drones inserted`);
	mongoose.connection.close();
});

/*
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/lab-express-drones";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .then(() => {
    Drone.insertMany(drones).then((drones) => {
	    console.log(`${drones.length} drones inserted`);
	    mongoose.connection.close();
    }); 
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
*/
