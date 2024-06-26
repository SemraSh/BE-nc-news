process.env.NODE_ENV = 'test';
const saveTestData = require('../seed/test.seed');
const { expect } = require('chai');
const app = require('../server');
const request = require('supertest')(app);
const mongoose = require('mongoose');
const db = process.env.DB_URL_TEST;
mongoose.Promise = Promise;

describe('Users Error Handling', () => {
	let data = {};
	before(() => {
		const p = mongoose.connection.readyState === 0 ? mongoose.connect(db) : Promise.resolve();
		return p
			.then(() => mongoose.connection.dropDatabase())
			.then(saveTestData)
			.then(savedData => {
				data = savedData;
				return data;
			});
	});

	after(done => {
		mongoose.disconnect();
		done();
	});

	it('"GET /api/users" returns error if misstyped', () => {
		return request
			.get('/api/userrs')
			.expect(404)
			.then(res => {
				expect(res.body.error.message).to.equal('Page not found! Invalid Path!');
			});
	});

	it('"GET /api/users/:username" returns error if the user doesn\'t exist in the database', () => {
		return request
			.get('/api/users/notvalid')
			.expect(400)
			.then(res => {
				expect(res.body.error.message).to.equal('User doesn\'t exist');
			});
	});

});