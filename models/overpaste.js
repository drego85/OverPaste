const mongoose = require("mongoose");

const pasteSchema = mongoose.Schema({
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

mongoose.model("Notes" , pasteSchema);