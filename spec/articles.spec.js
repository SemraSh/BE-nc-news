if (!process.env.NODE_ENV) process.env.NODE_ENV = 'test';
const saveTestData = require('../seed/test.seed');
const { expect } = require('chai');
const app = require('../server');
const request = require('supertest')(app);
const mongoose = require('mongoose');
const db = process.env.DB_URL_TEST;
mongoose.Promise = Promise;

describe('Articles', () => {
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

	it('"GET /articles" returns an array of all topics and status code 200', () => {
		return request
			.get('/articles?page=1')
			.expect(200)
			.then(res => {
				const articles = res.body.docs;
				expect(articles).to.be.an('array');
				expect(articles.length).to.equal(2);
				expect(Object.keys(articles[0])).to.eql(['votes', '_id', 'title', 'body', 'belongs_to', '__v']);
			});
	});

	it('"GET /articles/:article_id" returns an object with values of the requested article and status code 200', () => {
		const articleId = data.articles[0]._id;
		return request
			.get(`/articles/${articleId}`)
			.expect(200)
			.then(res => {
				const article = res.body;
				expect(article).to.be.an('object');
				expect(article._id).to.equal(`${articleId}`);
				expect(article.belongs_to).to.equal('cats');
				expect(article.body.length).to.be.at.least(1);
				expect(article.title.length).to.be.at.least(1);
			});
	});
	it('"POST /articles/:article_id/comments" creates a new comment under the requested article', () => {
		const articleId = data.articles[1]._id;
		const comment = {
			belongs_to: articleId,
			body: 'This is a test comment',
		};
		return request
			.post(`/articles/${articleId}/comments`)
			.send(comment)
			.expect(201)
			.then(res => {
				const newComment = res.body;
				expect(newComment.body).to.equal(comment.body);
				expect(newComment.belongs_to).to.equal(`${articleId}`);
				expect(newComment.created_by).to.equal('northcoder');
				expect(newComment.votes).to.equal(0);
			});
	});

	it('"PUT /articles/:article_id?vote=up" increases the vote count by one', () => {
		const articleId = data.articles[0]._id;
		return request
			.put(`/articles/${articleId}?vote=up`)
			.expect(200)
			.then(res => {
				const article = res.body;
				expect(article._id).to.equal(`${articleId}`);
				expect(article.votes).to.equal(1);
			});
	});
	it('"PUT /articles/:article_id?vote=down" decreases the vote count by one', () => {
		const articleId = data.articles[1]._id;
		return request
			.put(`/articles/${articleId}?vote=down`)
			.expect(200)
			.then(res => {
				const article = res.body;
				expect(article._id).to.equal(`${articleId}`);
				expect(article.votes).to.equal(-1);
			});
	});
	
});