const saveTestData = require('../seed/test.seed');
const { expect } = require('chai');
const app = require('../server');
const request = require('supertest')(app);
const mongoose = require('mongoose');
const db = process.env.DB_URL_TEST;
mongoose.Promise = Promise;

describe('Topics', () => {
	let data;
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

	it('"GET /topics" gets all the topics', () => {
		return request
			.get('/topics')
			.expect(200)
			.then(res => {
				let topics = res.body;
				expect(topics).to.be.an('array');
				expect(topics.length).to.equal(3);
			});
	});
	it('"GET /topics/:topic/articles/" returns all the articles for one topic', () => {
		const topic = data.topics[0].slug;
		return request
			.get(`/topics/${topic}/articles`)
			.expect(200)
			.then(res => {
				const articlesByTopic = res.body;
				expect(articlesByTopic[0].belongs_to).to.equal(`${topic}`);
				expect(articlesByTopic.length).to.equal(1);
				expect(Object.keys(articlesByTopic[0]).length).to.equal(6);
			});
	});
	it('"POST /topics/:topic/articles" creates a new article under the requested topic', () => {
		const topic = data.topics[1].slug;
		const article = {
			belongs_to: topic,
			title: 'Test article',
			body: 'This is a test article',
			created_by: 'creator'
		};
		return request
			.post(`/topics/${topic}/articles`)
			.send(article)
			.expect(201)
			.then(res => {
				console.log(res)
				const newArticle = res.body;
				expect(newArticle.title).to.equal(article.title);
				expect(newArticle.body).to.equal(article.body);
				expect(newArticle.created_by).to.equal(article.created_by);
				expect(newArticle.belongs_to).to.equal(`${topic}`);
			});
	});
});