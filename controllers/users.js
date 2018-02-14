const mongoose = require('mongoose');
mongoose.Promise = Promise;
const { Users } = require('../models/models');

const getAllUsers = (req, res) => {
	Users.find()
		.then(users => res.status(200).json(users))
		.catch(console.error);
};

const getUserByUsername = (req, res) => {
	Users.findOne({username: req.params.username})
		.then(user => res.status(200).json(user))
		.catch(console.error);
};


module.exports = {getAllUsers, getUserByUsername};