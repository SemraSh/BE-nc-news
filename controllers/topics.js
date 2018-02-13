const mongoose = require('mongoose');
mongoose.Promise = Promise;
const { Topics} = require('../models/models.js');

const getAllTopics = (req, res) => {
	Topics.find()
		.then(topics => {
			res.status(200).json(topics);
		}).catch(err=>{
			if(err === 404) console.log('Not found!')
			else console.log('All topics fetched')
		});
};



module.exports = { getAllTopics};