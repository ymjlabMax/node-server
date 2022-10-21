/*
pm2 start ecosystem.config.js
*/
var express = require("express"); // express
const router = express.Router();
var SERVER_PORT = 4000;
var session = require("express-session");
var express = require("express");
var app = express();
const cors = require("cors");
app.use(cors());

var routes = require("./route.js");
app.use("/", routes);

var server = app.listen(SERVER_PORT, "0.0.0.0", function () {
    var host = server.address().address;
    var port = server.address().port;

  
    console.log("app listening at http://%s:%s", host, port);
});
