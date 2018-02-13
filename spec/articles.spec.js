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
		const checkConnection = mongoose.connection.readyState === 0 ? mongoose.connect(db) : Promise.resolve();
		return checkConnection
			.then(() => mongoose.connection.dropDatabase())
			.then(saveTestData)
			.then(savedData => {
				data = savedData
				return data
			});
	});
	after((done) => {
		mongoose.disconnect()
		done()
	});

	it('"GET /articles" returns an array of all topics and status code 200', () => {
		return request
			.get('/articles')
			.expect(200)
			.then(res => {
				const articles = res.body;
				expect(articles).to.be.an('array');
				expect(articles.length).to.equal(2);
				expect(Object.keys(articles[0])).to.eql(['votes', '_id', 'title', 'body', 'belongs_to', '__v']);
			});
	});

	it('"GET /articles/:article_id" returns an object with values of the requested article', () => {
		const articleId = data.articles[0]._id
		return request
			.get(`/articles/${articleId}`)
			.expect(200)
			.then(res => {
				const article = res.body
				expect(article).to.be.an('object')
				expect(article._id).to.equal(`${articleId}`)
				expect(article.belongs_to).to.equal('cats')
				expect(article.body.length).to.be.at.least(1)
				expect(article.title.length).to.be.at.least(1)
			});
	});

});