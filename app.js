const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const exphbs = require("express-handlebars");
const helpers = require("handlebars-helpers")();
const methodOverride = require("method-override");

// Calls the express function
const app = express();

// Define static resources
app.use("*/js" , express.static(__dirname + "/assets/js"));
app.use("*/css" , express.static(__dirname + "/assets/css"));
app.use("*/images" , express.static(__dirname + "/assets/images"));
app.use("*/plugins" , express.static(__dirname + "/assets/plugins"));

// Connect to MongoDB with Mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/overpaste", {useNewUrlParser: true}, function(err) {
    if (err) {
        return console.error(err);
    }
    console.log("Connect to MongoBD");
});

// Mongoose Model and Schema
require("./models/overpaste");
const Note = mongoose.model("Note");

// Handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

// Create a middleware session
app.use(session({
    secret: "123star",
    resave: true,
    saveUninitialized: true,
}));


// Route for Homepage
app.get("/" , (req , res)=>{
	let headerTitle = "New Paste";
    res.render("new_paste", {headerTitle: headerTitle});
});


// Route for Paste List
app.get("/list_paste" , (req , res) =>{
	let headerTitle = "Paste List";
	Note.find({})
	.sort({datetime: "desc"})
	.then(note => {
	    res.render("list_paste" , {
	        note: note,
	        headerTitle: headerTitle
	    });
	});
});

// Route for Paste Views
app.get("/view_paste/:id" , (req , res) =>{
	let headerTitle = "Paste View";
    Note.findOne({
        _id: req.params.id
    })
    .then(nota =>{
        res.render("view_paste" , {
			nota: nota,
			headerTitle: headerTitle
       	});
    });
});


// Route to save New Paste
app.post("/", (req, res) => {
    const nuovaNota = {
		title: req.body.title,
        pastetext: req.body.pastetext
    }
    new Note(nuovaNota)
    .save()
    .then(nota =>{
        res.redirect("/list_paste");
    })
});


// Route for Paste Delete 
app.get("/delete_paste/:id" , (req , res) =>{
    Note.remove({
        _id: req.params.id
    })
    .then(nota =>{
        res.redirect("/list_paste");
    });
});

// Listening Web Server
const port = 3000;
app.listen(port, ()=>{
    console.log("Over Paste listening...");
})