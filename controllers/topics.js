const mongoose = require('mongoose');
mongoose.Promise = Promise;
const { Topics} = require('../models/models.js');

const getAllTopics = (req, res) => {
	Topics.find()
		.then(topics => {
			res.status(200).json(topics);
		}).catch(console.error);
};



module.exports = { getAllTopics};