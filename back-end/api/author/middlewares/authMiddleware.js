//authentication middleware.js
const jwt = require("jsonwebtoken");
const user = require("../models/author");
const jwt_enc_key = require("../../../.env").jwt_enc_key;

const checkAuthentication = (req, res, next) =>{

	token = req.headers["x-access-token"];
	console.log("checkAuthentication middleware : "+token);
	jwt.verify(token, jwt_enc_key, function(err, decoded){
		if(err){
			return res.status(401).send({success : false, message : "You are unauthorized, please log in."});
		}
		req.name = decoded.name;
		next();
	});
}

module.exports  = checkAuthentication;
