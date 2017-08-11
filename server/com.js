var express = require('express');
var app = express();
app.use('/',express.static('./'));

var http = require('http').createServer(app);
http.listen(12345,function(){
	console.log("80")
});


app.get("/index",function(req,res){
	res.sendFile(__dirname+"/index.html");
})


module.exports = app;