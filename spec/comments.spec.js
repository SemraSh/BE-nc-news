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
		const checkConnection = mongoose.connection.readyState === 0 ? mongoose.connect(db) : Promise.resolve();
		return checkConnection
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

	it('"GET /comments" returns all the comments', ()=>{
    return request
    .get('/comments')
    .expect(200)
    .then(res => {
      const comments = res.body
      expect(comments.length).to.equal(2);
      expect(comments[0].body.length).to.be.at.least(1)
    })
  })
  it('"GET /comments/:comment_id " returns the comments of the requested id', () => {
    const commentId = data.comments[0]._id
    return request
    .get(`/comments/${commentId}`)
    .expect(200)
    .then(res => {
      const comment = res.body
      expect(comment._id).to.equal(`${commentId}`)
      expect(comment.body.length).to.be.at.least(1)
    })
  })
	
});