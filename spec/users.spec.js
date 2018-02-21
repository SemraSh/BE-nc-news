if (!process.env.NODE_ENV) process.env.NODE_ENV = 'test'
const saveTestData = require('../seed/test.seed');
const { expect } = require('chai');
const app = require('../server');
const request = require('supertest')(app);
const mongoose = require('mongoose');
const db = process.env.DB_URL_TEST;
mongoose.Promise = Promise;

describe('Users', () => {
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

	it('"GET /users" returns all the users', () => {
		return request
			.get('/users')
			.expect(200)
			.then(res => {
				const users = res.body;
				expect(users.length).to.equal(1);
				expect(users[0].username).to.equal('northcoder');
			});
	});

	it('"GET /users/:username" returns the user on requested username', () => {
		const username = data.user.username;
		return request
			.get(`/users/${username}`)
			.expect(200)
			.then(res => {
				const user = res.body;
				expect(user.username).to.equal(username);
			});
	});

});