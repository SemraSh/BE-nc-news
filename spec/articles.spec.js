const saveTestData = require('../seed/test.seed');
const { expect } = require('chai');
const app = require('../server');
const request = require('supertest')(app);
const mongoose = require('mongoose');
const db = process.env.DB_URL_TEST;
mongoose.Promise = Promise;

describe('Articles', () => {
	before(() => {
		const p = mongoose.connection.readyState === 0 ? mongoose.connect(db) : Promise.resolve();
		return p
			.then(() => {
				return mongoose.connection.dropDatabase();
			})
			.then(saveTestData)
			.then(savedData => {
				data = savedData;
			});
	});
	after(done => {
		mongoose.connection.close();
		done();
	});
	it('"GET /articles" gets all the articles', () => {
		return request
			.get('/articles')
			.expect(200)
			.then(res => {
				let articles = res.body;
				expect(articles).to.be.an('array');
				expect(articles.length).to.equal(2);
				expect(Object.keys(articles[0])).to.eql(['votes', '_id', 'title', 'body', 'belongs_to', '__v']);
			});
	});
});