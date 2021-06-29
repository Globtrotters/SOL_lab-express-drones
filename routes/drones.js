const express = require('express');
const router = express.Router();

// require the Drone model here
const Drone = require('../models/Drone.model');



// Iteration #2: List the drones
router.get('/', (req, res) => {
	Drone.find().then((drones) => {
		res.render('drones/list', { drones });
	});
});



// Iteration #3: Add a new drone
router.get('/create', (req, res) => {
	res.render('drones/create-form');
});

// Iteration #3: Add a new drone
router.post('/create', (req, res) => {
	//Extract variables from the body
	const { name, propellers, maxSpeed } = req.body;

	//Validate the data
	if (!name || !propellers || !maxSpeed) {
		res.render('drones/create-form', { errorMessage: 'Fill all the fields' });
	}

	//Create the data and redirect to the listing page
	//This way, we will get the previous route, get all the database items and see the new drone there
	Drone.create({ name, propellers, maxSpeed })
		.then(() => {
			res.redirect('/drones');
		})
		.catch((err) => {
			res.render('drones/create-form', { errorMessage: err });
		});
});



// Iteration #4: Update the drone
router.get('/:id/edit', (req, res) => {
	//extract the id param from the query
	const { id } = req.params;

	Drone.findById(id)
		.then((drone) => {
			res.render('drones/update-form', drone);
		})
		.catch((err) => console.log(err));
});

// Iteration #4: Update the drone
router.post('/:id/edit', (req, res) => {
	const { name, propellers, maxSpeed } = req.body;
	const { id } = req.params;

	Drone.findByIdAndUpdate(id, { name, propellers, maxSpeed })
		.then(() => {
			res.redirect('/drones');
		})
		.catch((err) => {
			res.render('drones/update-form', { errorMessage: err });
		});
});



// Iteration #5: Delete the drone
router.post('/:id/delete', (req, res) => {
	Drone.findByIdAndRemove(req.params.id)
		.then(() => {
			res.redirect('/drones');
		})
		.catch((err) => console.log(err));
});

module.exports = router;
