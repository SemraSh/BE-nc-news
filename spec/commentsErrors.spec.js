process.env.NODE_ENV = 'test'
const saveTestData = require('../seed/test.seed');
const { expect } = require('chai');
const app = require('../server');
const request = require('supertest')(app);
const mongoose = require('mongoose');
mongoose.Promise = Promise;

describe('Comments Error Handling', () => {
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
  
	it('"GET /comments" returns error if misstyped', () => {
		return request
			.get('/coments')
			.expect(404)
			.then(res => {
				expect(res.body.error.message).to.equal("Page not found! Invalid Path!");
			});
  });


	it('"GET /comments/:comment_id" returns error if the id is not valid ', () => {
		const commentId = data.comments[0]._id;
		return request
			.get(`/comments/${commentId}1`)
			.expect(400)
			.then(res => {
				expect(res.body.error.message).to.equal('Comment id is not valid!');
			});
  });

	it('"PUT /comments/:comment_id?vote=up" returns error if the format of the query is wrong', () => {
		const commentId = data.comments[0]._id;
		return request
			.put(`/comments/${commentId}?vote=upp`)
			.expect(400)
			.then(res => {
				expect(res.body.error.message).to.equal('Please provide a query in the format vote=up or vote=down');
			});
	});

	it('"DELETE /comments/:comment_id" returns error if comment_id is not valid', ()=>{
		return request
			.delete(`/comments/invalidid`)
			.expect(400)
			.then(res => {
				expect(res.body.error.message).to.equal('Comment id is not valid!');
			});
	});

});