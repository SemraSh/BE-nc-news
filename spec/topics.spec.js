const saveTestData = require('../seed/test.seed');
const { expect } = require('chai');
const app = require('../server');
const request = require('supertest')(app);
const mongoose = require('mongoose');
mongoose.Promise = Promise;

describe('topics', ()=>{
	let baseData;
	before(()=>{
		return mongoose.connection.dropDatabase()
			.then(saveTestData)
			.then(data=>{
				baseData = data;
			}).catch(console.error);
	});

	it('GET /topics', (done)=>{
		return request
			.get('/topics')
			.expect(200)
			.then(topics =>{
				expect(topics.length).to.equal(3);
				expect(topics[0].title).to.equal('Football');
				done();
			});
	}).timeout(9000);
});