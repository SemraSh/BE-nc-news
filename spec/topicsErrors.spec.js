process.env.NODE_ENV = 'test';
const saveTestData = require('../seed/test.seed');
const { expect } = require('chai');
const app = require('../server');
const request = require('supertest')(app);
const mongoose = require('mongoose');
const db = process.env.DB_URL_TEST;
mongoose.Promise = Promise;

describe('Topics Error Handling', () => {
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

	it('"GET /api/topics" returns error if misstyped', () => {
		return request
			.get('/api/topic')
			.expect(404)
			.then(res => {
				expect(res.body.error.message).to.equal('Page not found! Invalid Path!');
			});
	});

	it('"GET /api/topics/:topic/articles" returns error if the topic doesn\'t exist in the database', () => {
		return request
			.get('/api/topics/:notvalid/articles')
			.expect(400)
			.then(res => {
				expect(res.body.error.message).to.equal('Topic doesn\'t exist');
			});
	});

	it('"POST /api/topics/:topic/articles" returns error if required properties are not filled' ,()=>{
		const topicName = data.topics[0].slug;
		const article = {
			belongs_to: topicName,
			title: '',
			body: 'this is a body that doenst have a title',
			created_by: 'northcoder'
		};
		return request
			.post(`/api/topics/${topicName}/articles`)
			.send(article)
			.expect(400)
			.then(res => {
				expect(res.body.error.message).to.equal('New article should include the required properties \'belongs_to\', \'title\', \'body\', \'created_by\'');
			});
	});

	it('"POST /api/topics/:topic/articles" returns error if the topic is not in the database' ,()=>{
		const topicName = data.topics[0].slug;
		const article = {
			belongs_to: 'doesnt exist',
			title: 'this is a title',
			body: 'this request will fail because that topic is not in the database',
			created_by: 'northcoder'
		};
		return request
			.post(`/api/topics/${topicName}/articles`)
			.send(article)
			.expect(400)
			.then(res => {
				expect(res.body.error.message).to.equal('\'belongs_to\' should be a valid topic');
			});
	});

	it('"POST /api/topics/:topic/articles" returns error if the user is not in the database' ,()=>{
		const topicName = data.topics[0].slug;
		const article = {
			belongs_to: topicName,
			title: 'this is a title',
			body: 'this request will fail because that user is not in the database',
			created_by: 'not in database'
		};
		return request
			.post(`/api/topics/${topicName}/articles`)
			.send(article)
			.expect(400)
			.then(res => {
				expect(res.body.error.message).to.equal('\'created_by\' should be a valid user');
			});
	});
});