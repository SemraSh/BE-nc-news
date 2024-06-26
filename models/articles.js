var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

var ArticleSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	body: {
		type: String,
		requied: true
	},
	belongs_to: {
		type: String,
		required: true
	},
	votes: {
		type: Number,
		required: true,
		default: 0
	},
	created_by: {
		type: String,
		lowercase: true
	}
});

ArticleSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('articles', ArticleSchema);
