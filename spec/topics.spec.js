const saveTestData = require('../seed/test.seed');
const { expect } = require('chai');
const app = require('../server');
const request = require('supertest')(app);
const mongoose = require('mongoose');
const db = process.env.DB_URL_TEST;
mongoose.Promise = Promise;

describe('Topics', () => {
	before(() => {
		const checkConnection = mongoose.connection.readyState === 0 ? mongoose.connect(db) : Promise.resolve();
		return checkConnection
			.then(() => {
				return mongoose.connection.dropDatabase();
			})
			.then(saveTestData)
			.then(savedData => savedData);
	});
	after(done => { mongoose.disconnect(), done(); });

	it('"GET /topics" gets all the topics', () => {
		return request
			.get('/topics')
			.expect(200)
			.then(res => {
				let topics = res.body;
				expect(topics).to.be.an('array');
				expect(topics.length).to.equal(3);
				expect(topics[0].title).to.equal('Football');
			});
	});
});