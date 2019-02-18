const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
	title:{
	    type: String,
	    required: true
	},
	pastetext:{
		type: String,
		required: true
	},
	datetime:{
	    type: Date,
	    default: Date.now
	}
});

mongoose.model("Note" , noteSchema);