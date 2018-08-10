const express = require('express');
const router = express.Router();
const async = require('async');

const actions = require('../logic/place-actions.js');

router.get('/', function(req, res) {
	const userId = req.selectedUserGroup;

	actions.getPlacesForUser(userId).then(function(result) {
		res.send(result);
	}).catch(function(err) {
		res.status(400).send(err);
	});
});

router.post('/', function(req, res) {
	const userId = req.selectedUserGroup;

	if(Array.isArray(req.body)) {
		async.each(req.body, (item, callback) => {
			if(item.id == null) {
				actions.addNewPlace(userId, item).then(response => {
					callback();
				}).catch((error) => {
					callback(error);
				});
			} else {
				actions.updatePlace(userId, item).then(response => {
					callback();
				}).catch((error) => {
					callback(error);
				});
			}
		}, (err) => {
			if(error) {
				res.status(400).send(error);
			} else {
				res.status(201).send({success : true});
			}	
		});
	} else {
		actions.addNewPlace(userId, req.body).then(response => {
			res.status(201).send(response);
		}).catch(error => {
			res.status(400).send(error);
		});
	}


});

router.get('/:id', function(req, res) {
	const userId = req.selectedUserGroup;
	const placeId = req.params.id;

	actions.getPlace(userId, id).then(place => {
		res.send(place);
	}).catch(error => {
		if(error.key == 'NO_PLACE_FOUND') {
			res.status(404).send(error);
		} else {
			res.status(400).send(error);
		}
	});
});

router.get('/:id/weather', (req, res) => {
	const userId = req.selectedUserGroup;
	const placeId = req.params.id;
	let date = null;

	if(req.query.time) {
		date = new Date(req.query.time);
	} else {
		date = new Date();
	}

	if(isNaN(date.getTime())) {
		res.status(400).send({
			"message" : "parameter time " + req.query.time + " is invalid"
		});
	} else {
		actions.getWeather(userId, placeId, date).then(place => {
			res.send(place);
		}).catch(error => {
			if(error.key == 'NO_PLACE_FOUND') {
				res.status(404).send(error);
			} else {
				res.status(400).send(error);
			}
		});
	}
});

router.delete('/:id', function(req, res) {
	res.send({ hello : "all"});
});

router.put('/:id', function(req, res) {
	res.send({ hello : "all"});
});

module.exports = router;