const mongoose = require('mongoose');
mongoose.Promise = Promise;
const { Topics} = require('../models/models.js');

const getAllTopics = (req, res, next ) => {
	Topics.find()
		.then(topics => res.status(200).json(topics))
		.catch(err => next(err))
};



module.exports = { getAllTopics};