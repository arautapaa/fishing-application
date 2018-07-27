const express = require('express');
const router = express.Router();

const actions = require('../logic/draught-actions.js');

router.get('/', function(req, res) {
	const userId = req.selectedUserGroup;

	actions.getDraughtsForUser(userId).then((draughts) => {
		res.status(200).send(draughts);
	}).catch((error) => {
		res.status(400).send(error);
	});
});

router.post('/', function(req, res) {
	const userId = req.selectedUserGroup;
	const draught = req.body;

	actions.saveDraught(userId, draught).then((draught) => {
		res.status(201).send(draught);
	}).catch((error) => {
		res.status(400).send(error);
	})
});

router.get('/:id', function(req, res) {
	const userId = req.selectedUserGroup;
	const draughtId = req.params.id;

	actions.getOneDraught(userId, draughtId).then((draught) => {
		res.status(200).send(draught);
	}).catch((error) => {
		if(error.key == 'NO_ENTRY_FOUND') {
			res.status(404).send(error);
		} else {
			res.status(400).send(error);
		}
	});
})

router.delete('/:id', function(req, res) {
	res.send({ hello : "all"});
});

router.put('/:id', function(req, res) {
	res.send({ hello : "all"});
});

module.exports = router;