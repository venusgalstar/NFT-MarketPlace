const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const fileUpload = require("express-fileupload");
const path = require("path");
///const history = require("connect-history-api-fallback");

mongoose.connect('mongodb://192.168.103.53/gigaland_user', {useNewURLParser:true});

//app.use(history());
//app.use("/", express.static("./build"));

app.use(fileUpload());
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(cors());
app.use(express.static(__dirname + '/public/images'));
app.use('/public/images', express.static(__dirname + '/public/images/'));

require('./api/author/services/author')(app);
require('./api/author-sales/services/author-sales')(app);
require('./api/bid/services/bid')(app);
require('./api/hot-collection/services/hot-collection')(app);
require('./api/nft/services/nft')(app);

app.listen(1337, ()=>console.log('Server is running on port 1337'));
