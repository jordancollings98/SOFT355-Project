var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var noteSchema = new Schema({
	title: String,
	message: String
	}, {
    timestamps: true
});

var Note = mongoose.model('notes', noteSchema, 'notes');

module.exports.Note = Note;
module.exports = mongoose.model('notes', noteSchema);
