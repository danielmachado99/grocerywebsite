const express = require("express");
var bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();
const bcrypt = require("bcrypt");
const cors = require("cors");
// app.use(cors({
//   origin: 'http://localho.st:3001/'
//   //origin: '*'
// }));
const path = require("path");
require("dotenv").config();
console.log(process.env.MDB_STRING);
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "POST,GET,OPTIONS,PUT,DELETE");
	res.header(
		"Access-Control-Allow-Headers",
		"Content-Type,Accept,email,username,password,authorization"
	);
	next();
});

app.use(express.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
const mongoose = require("mongoose");
const DB_CONNECTION_STRING = process.env.MDB_STRING;
mongoose.connect(DB_CONNECTION_STRING);
const Schema = mongoose.Schema;
const validateEmail = (email) => {
	const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(email);
};
const OrderSchema = new Schema(
	{
		Email: {
			type: String,
			trim: true,
			lowercase: true,
			unique: false,
			required: "Email address is required",
			validate: [validateEmail, "Please fill a valid email address"],
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				"Please fill a valid email address",
			],
		},
		name: String,
		MobileNumber: Number,
		Address: String,
		Cart: { type: Map },
	},
	{ timestamps: true }
);

const OrderModel = mongoose.model("orders", OrderSchema);
// const barcodeItemDetails = new Schema({
//   quantity: String,
// });
var barcode = new Schema({
	barcode: { type: String },
	quantity: String,
});
const NameBacodesSchema = new Schema(
	{
		barcode: { type: String, unique: false },
		name: String,
		size: String,
		imgurl: String,
	},
	{ timestamps: true }
);

const NameBacodes = mongoose.model("NameBacodesNEW", NameBacodesSchema);

// const Schema = mongoose.Schema;

// const SomeModelSchema = new Schema({
//   a_string: String,
//   a_date: Date
// });

// const SomeModel = mongoose.model('123', SomeModelSchema, 'newexercise');
// const awesome_instance = new SomeModel({ a_string: 'awesome3' });

// // Save the new model instance, passing a callback
// awesome_instance.save((err) => {
//     if (err) return handleError(err);
//     // saved!
//     //console.log("saved")
//   });

//   const re = mongoose.model('123', SomeModelSchema);

//   // find all athletes who play tennis, selecting the 'name' and 'age' fields
//   re.find({}, '', (err, athletes) =>
//   {
//     //console.log(athletes)
//     if (err) return handleError(err);
//     // 'athletes' contains the list of athletes that match the criteria.
//   })

// app.get("/", function (req, res) {
//   // res.send("helllo");
//   res.json({ one: 1 });
// });
app.use(express.static("build"));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post("/addInventory", function (req, res) {
	// NameBacodes.find({}, "name barcodes", function (err, docs) {
	//   res.json(docs);
	//   //console.log(docs);
	// });

	//   const addInventory_instance = new NameBacodes({
	//     name: "Maggi Noodles",
	//     barcodes: ["sdfasdf", "sdfsdfsdfb"],
	//   });

	//   addInventory_instance.save((err) => {
	//     if (err) {
	//       //console.log(err);
	//       return res.send(err, 400);
	//     } else {
	//       // saved!
	//       //console.log("saved");
	//       res.send("Post submitted successfully", 200);
	//     }
	//   });
	//barcodes = new Schema({ a: { type: String, unique: false } });
	NameBacodes.updateOne(
		{ name: "Quaker Oats" },
		//{ $push: { barcodes: { barcode: "1", quantity: "100g" } } },
		{
			barcodes: [
				{
					barcode: "Quaker Oats 1",
					quantity: "Single",
					imgurl:
						"https://newassets.apollo247.com/pub/media/catalog/product/o/a/oat0005.jpg",
				},
				{
					barcode: "Quaker Oats 2",
					quantity: "Two pack",
					imgurl: "https://m.media-amazon.com/images/I/71KraFJZRuL._SL1000_.jpg",
				},
				{
					barcode: "Quaker Oats 3",
					quantity: "Four Pack",
					imgurl: "https://m.media-amazon.com/images/I/81twIv6P+kL._SL1500_.jpg",
				},
			],
		},
		{ upsert: true, setDefaultsOnInsert: true },
		function (err, docs) {
			if (err) {
				console.log(err);
				res.send(err, 500);
			} else {
				console.log("Updated Docs : ", docs);
				res.send(("Updated Docs : ", docs), 200);
			}
		}
	);
});

app.post("/addInventoryNEW", function (req, res) {
	// NameBacodes.find({}, "name barcodes", function (err, docs) {
	//   res.json(docs);
	//   //console.log(docs);
	// });

	//   const addInventory_instance = new NameBacodes({
	//     name: "Maggi Noodles",
	//     barcodes: ["sdfasdf", "sdfsdfsdfb"],
	//   });

	//   addInventory_instance.save((err) => {
	//     if (err) {
	//       //console.log(err);
	//       return res.send(err, 400);
	//     } else {
	//       // saved!
	//       //console.log("saved");
	//       res.send("Post submitted successfully", 200);
	//     }
	//   });
	//barcodes = new Schema({ a: { type: String, unique: false } });
	NameBacodes.updateOne(
		{ name: "Maggi Noodles", barcode: "maggi noodles 1" },
		//{ $push: { barcodes: { barcode: "1", quantity: "100g" } } },
		{
			size: "1 pack",
			imgurl: "https://m.media-amazon.com/images/I/81dpDHc95AL._SL1500_.jpg",
		},
		{ upsert: true, setDefaultsOnInsert: true },
		function (err, docs) {
			if (err) {
				console.log(err);
				res.send(err, 500);
			} else {
				console.log("Updated Docs : ", docs);
				res.send(("Updated Docs : ", docs), 200);
			}
		}
	);
});

app.get("/getInventory", function (req, res) {
	NameBacodes.find({}, "", function (err, docs) {
		res.json(docs);
		//console.log(docs);
	});
});

app.post("/neworder", function (req, res) {
	const mobilenumber = req.body["Mobile number"].replace(/ /g, "");
	console.log(mobilenumber);
	OrderModel.updateOne(
		{ name: req.body.Name },
		//{ $push: { barcodes: { barcode: "1", quantity: "100g" } } },
		{
			MobileNumber: mobilenumber,
			Email: req.body.Email,
			Address: req.body.Address,
			Cart: req.body.CartState,
		},
		{ upsert: true, setDefaultsOnInsert: true },
		function (err, docs) {
			if (err) {
				console.log(err);
				res.send(err, 500);
			} else {
				console.log("Updated Docs : ", docs);
				res.send(("Updated Docs : ", docs), 200);
			}
		}
	);
});

app.post("/searchInventory", function (req, res) {
	console.log(req.body);
	NameBacodes.find(
		{ name: { $regex: req.body.name, $options: "i" } },
		"",

		function (err, docs) {
			if (err) {
				res.send(500);
			}
			res.json(docs);
			//console.log(docs);
		}
	);
});

function ensureToken(req, res, next) {
	//console.log(req.headers);
	const bearerHeader = req.headers.authorization;
	if (typeof bearerHeader !== "undefined") {
		const bearer = bearerHeader.split(" ");
		const bearerToken = bearer[1];
		req.token = bearerToken;
		next();
	} else {
		res.sendStatus("403");
		next();
	}
}
app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});
var https = require("https");
const port = process.env.PORT || 80;
app.listen(port, function () {
	console.log("App listening on port", port);
});
