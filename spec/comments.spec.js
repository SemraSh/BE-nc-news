if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev'
const saveTestData = require('../seed/test.seed');
const { expect } = require('chai');
const app = require('../server');
const request = require('supertest')(app);
const mongoose = require('mongoose');
const db = process.env.DB_URL_TEST;
mongoose.Promise = Promise;

describe('Comments', () => {
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

	it('"GET /comments" returns all the comments', ()=>{
		return request
			.get('/comments')
			.expect(200)
			.then(res => {
				const comments = res.body;
				expect(comments.length).to.equal(2);
				expect(comments[0].body.length).to.be.at.least(1);
			});
	});
	it('"GET /comments/:comment_id " returns the comments of the requested id', () => {
		const commentId = data.comments[0]._id;
		return request
			.get(`/comments/${commentId}`)
			.expect(200)
			.then(res => {
				const comment = res.body;
				expect(comment._id).to.equal(`${commentId}`);
				expect(comment.body.length).to.be.at.least(1);
			});
	});
	it('"PUT /comments/:comment_id?vote=up" increases the vote count by one', () => {
		const commentId = data.comments[0]._id;
		return request
			.put(`/comments/${commentId}?vote=up`)
			.expect(200)
			.then(res => {
				const comment = res.body;
				expect(comment._id).to.equal(`${commentId}`);
				expect(comment.votes).to.equal(1);
			});
	});
	it('"PUT /comments/:comment_id?vote=down" decreases the vote count by one', () => {
		const commentId = data.comments[1]._id;
		return request
			.put(`/comments/${commentId}?vote=down`)
			.expect(200)
			.then(res => {
				const comment = res.body;
				expect(comment._id).to.equal(`${commentId}`);
				expect(comment.votes).to.equal(-1);
			});
	});
	it('"DELETE /comments/:comment_id" deletes the specified comment', ()=>{
		const commentId = data.comments[0]._id;
		return request
			.delete(`/comments/${commentId}`)
			.expect(200)
			.then(res => {
				expect(res.body).to.eql({message: `comment ${commentId} deleted`});
			});
	}); 
});