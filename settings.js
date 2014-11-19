var http = require('http')
console.log("inicio ...")
var path = require('path')
var fs   = require('fs')
var host = "127.0.0.1"
var port = 8080

var extensions = {

	".html":"text/html",
	".css" :"text/css",
	".js"  :"aplication/javascript",
	".png" :"imagenes/png",
	".gif" :"imagenes/gif",
	".jpg" :"imagenes/jpeg",
	".jpeg" :"imagenes/jpeg",

}


function getFile(filePath, response, page404, mimeType){
	
	fs.exists(filePath,function(exists){
		
		if(exists){
			
			fs.readFile(filePath,function(err,contents){
				if(!err){
					response.writeHead(200,{
						"Content-type" : mimeType,
						"Content-Length" : contents.length
					});
					response.end(contents);
					console.log("response    200 http://" + host+ ":" + port)
				} else {
					console.dir('404');
				};
			});
		} else {
			
			fs.readFile(page404,function(err,contents){
				
				if(!err){
					response.writeHead(404, {'Content-Type': 'text/html'});
					response.end(contents);
				} else {
					console.dir('404');
				};
			});
		};
	});
}


function requestHandler(request, response){
	var fileName = path.basename(request.url)
	// console.log(fileName) obtiene los archivos index.html, crear.js, stilo.css
	var ext = path.extname(fileName)
	//console.log(ext) obtiene las extenciones de los archivos 
	var localFolder = __dirname + "/public/"
	var page404 = localFolder + "404.html"

	if(!extensions[ext]){
		response.writeHead(400,{'Content-Type':'text/html'})
		response.end('404')
		console.log("response    404 http://" + host+ ":" + port)
	}
	console.log(localFolder + fileName)
	getFile((localFolder + fileName), response, page404, extensions[ext])

}

http.createServer(requestHandler)
.listen(port, host, function(){
	console.log("response   200 url http://" + host+ ":" + port)
})





