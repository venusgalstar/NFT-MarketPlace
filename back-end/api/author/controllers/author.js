const models = require("../models/author");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require("path");
const MD5 = require("md5");
const author = models.author;
const Schema = mongoose.Schema;
const jwt_enc_key = require("../../../.env").jwt_enc_key;
const admin_email = require("../../../.env").admin_email;
const signIn_break_timeout = require("../../../.env").signIn_break_timeout;

const CreateAuthor = (req, res) => {
	console.log("post accept");
	var inCamedUserName = req.body.username;
	var inCamedEmail = req.body.email;
	var inCamePassword = req.body.password;

	author.find({ "email": inCamedEmail }, function (err, docs) {
		if (err) {
			return res.status(501).send({ success: false, message: "Internal Server Error." });
		}
		if (docs.length > 0) {
			return res.status(501).send({ success: false, message: "Email is duplicated." });
		} else {
			const new_author = new author(
				{
					...req.body
				});
			bcrypt.genSalt(10, (err, salt) => {
				if (err) {
					return res.status(501).send({ success: false, message: "Cannot save the new author." });
				}
				bcrypt.hash(new_author.password, salt, (err, hash) => {
					if (err) {
						return res.status(501).send({ success: false, message: "Cannot save the new author." });
					}
					else {
						new_author.password = hash;
						new_author.save(function (err) {
							if (!err)
								return res.status(200).send({ success: true, message: "Successfully create a new Author" });
							else
								return res.status(501).send({ success: false, message: "Cannot save the new author." });
						});
					}
				})
			})
		}
	})

}

//exception
const DeleteAuthor = async (req, res) => {
	await author.deleteOne({ _id: req.params.id }, function (err) {
		if (!err)
			return res.status(200).send({ success: true, message: "Successfully delete a new Author" });
		else
			return res.status(500).send({ success: false, message: "Internal server Error" });
	});
}

const UpdateAuthorProfile = async (req, res) => {
	console.log(" Update profile :  put accept ");

	if (!req.params.authorId || !req.files.avatar) {
		return res.status(400).send("No author's ID. Or no avatar.");
	}
	console.log(req.files.avatar);
	
	const file = req.files.avatar;
	var filename = MD5(req.params.authorId) + "." + file.name;
	path.join(__dirname, "../../../public");
	var fileSavingPath = process.cwd() + "/public/images/" + filename;	
	var upLoadedAvatar = "";

	await file.mv(fileSavingPath, async (err) => {
		if (err) {
			return res.status(401).send("No avatar is sent : " + err);
		} else {
			upLoadedAvatar = "/" + filename;
			console.log(upLoadedAvatar);
			try {
				await author.updateOne(
					{ _id: req.params.authorId },
					{
						$set: {
							avatar : upLoadedAvatar,
						},
						$currentDate: {
							ends: true,
						}
					},
					{ upsert: true }
				);
			} catch (err) {
				console.log("Updating Profile avatar : " + err.message);
				return res.status(500).send({ success: false, message: "Internal server Error" });
			}
			console.log("Updating Profile avatar : succeed.");
			return res.status(200).send({ success: true, message: "Successfully Update a Author" });
		}
	});		
}

//exception
const UpdateAuthor = async (req, res) => {
	console.log("UpdateAuthor  0 : ");
	
	if(req.body.new_password)
	{
		bcrypt.genSalt(10,  (err, salt) => 
		{
			if (err) 
			{
				return res.status(501).send({ success: false, message: "Cannot save the author. "+err });
			}
			bcrypt.hash(req.body.new_password, salt, async (err, hash) => 
			{
				if (err) 
				{
					return res.status(501).send({ success: false, message: "Cannot save the author. "+err});
				}
				else {
					console.log("hashnew password ", hash);
					try {
						var authorUp = req.body;
						authorUp =  {
							...authorUp,
							password : hash,
						};
						function trimJSON(json, propsToRemove) {
							propsToRemove.forEach((propName) => {
							  delete json[propName];
							});
						}
						// call the function 
						trimJSON(authorUp, ['__v', 'new_password', 'confirm_new_password', '_id']);
						console.log("authorUp : ", authorUp);
						await author.updateOne(
							{ _id: req.params.id },
							{
								$set: {
									...authorUp
								},
								$currentDate: {
									ends: true,
								}
							},
							{ upsert: true }
						);
					} catch (err) {
						return res.status(500).send({ success: false, message: "Internal server Error" });
					}
					console.log("Updating Author : succeed.");
					return res.status(200).json({ success: true, message: "Successfully Update a Author" })
				}
			})
		})
	}else{
		try {
			var authorUp = req.body;
			function trimJSON(json, propsToRemove) {
				propsToRemove.forEach((propName) => {
				  delete json[propName];
				});
			}
			// call the function 
			trimJSON(authorUp, ['__v', 'new_password', 'confirm_new_password', '_id']);
			console.log("authorUp : ", authorUp);
			await author.updateOne(
				{ _id: req.params.id },
				{
					$set: {
						...authorUp
					},
					$currentDate: {
						ends: true,
					}
				},
				{ upsert: true }
			);
		} catch (err) {
			return res.status(500).send({ success: false, message: "Internal server Error" });
		}
		console.log("Updating Author : succeed.");
		return res.status(200).json({ success: true, message: "Successfully Update a Author" })
	}
	
}

const FindAuthor = (req, res) => {
	console.log("FindAuthor  0");
	if (req.query.id !== undefined && req.query.id !== null) {
		author.find({ _id: req.query.id }, function (err, docs) {
			if (err) {
				console.log("Author doesn't exisit" + err.message);
				return res.status(500).send({ success: false, message: "Internal server Error" });
			}
			else {
				return res.status(200).send({ success: true, data: docs, message: "success" });
			}
		});
	}
	else {
		author.find({}, function (err, docs) {
			if (err) {
				console.log("Author(s) doesn't exisit" + err.message);
				return res.status(500).send({ success: false, message: "Internal server Error" });
			}
			else {
				return res.status(200).send({ success: true, data: docs, message: "success" });
			}
		});
	}
}

const LoginAuthor = (req, res) => {
	console.log("Log in user 0");
	author.findOne({ email: req.body.email }, function (err, docs) {
		if (err) {
			res.status(500).send({ success: false, message: "Internal server Error" });
			return;
		}
		if (docs === undefined || docs === null) {
			res.status(404).send({ success: false, message: "You are unregistered customer." });
			return;
		}
		else if (docs.password !== undefined) {
			console.log(docs.password + ", " + req.body.password);
			bcrypt.compare(req.body.password, docs.password).then(ismatch => {
				if (ismatch) {
					const jwtToken = jwt.sign(
						{ id: docs._id, isAdmin: (docs.email === admin_email) ? 1 : 0, ...docs },
						jwt_enc_key,
						{ expiresIn: signIn_break_timeout }
					);
					return res.status(200).send({ success: true, token: jwtToken });
				} else {
					return res.status(500).send({ success: false, message: "Password Wrong" });
				}
			}).catch((err) => {
				res.status(500).send({ success: false, message: "Internal server Error" });
				return;
			})
		}
	});
}

//exception
const FindOneAuthor = (req, res) => {
	console.log("FindOneAuthor 0");
	author.findOne({ _id: req.params.id }, function (err, docs) {
		console.log("err : " + err);
		if (err) {
			console.log("Author doesn't exisit" + err.message);
			return res.status(500).send({ success: false, message: "Internal server Error" });
		}
		else {
			if (docs !== null && docs !== undefined) return res.status(200).send({ success: true, data: docs, message: "success" });
			else return res.status(404).send({ success: false, data: [], message: "Can't find such author." });
		}
	});
}

const CountAuthor = (req, res) => {
	author.find().then(
		author => {
			if (!author) { return res.status(404).send({ success: false, data: [], message: "Can not find any Author" }) }
			return res.status(200).send({ success: true, data: author.length, message: "success" });
		}).catch(err => {
			console.log("Author doesn't exisit" + err.message);
			return res.status(500).send({ success: false, message: "Internal server Error" });
		})
}

module.exports = {
	CreateAuthor,
	DeleteAuthor,
	UpdateAuthor,
	FindAuthor,
	FindOneAuthor,
	CountAuthor,
	LoginAuthor,
	UpdateAuthorProfile,
};