var http = require('http');
var server = http.createSrver(function(req, res){
    //hello world
    var body = 'Hello World';
    res.setHeader('Content-Length', body.length);
    res.setHeader('Content-Type', 'text/plain');
    
    res.end(body);
    //end
    
    //404 not found：redirecting
    var url = 'http://google.com';
    var body = '<p>Redirecting to <a href=" ' + url + ' ">' + url + '</a></p>';
    
    res.setHeader('Location', url);
    res.setHeader('Content-Length', body.length);
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 302;
    
    //res.end(body);
    //end
        

});
server.listen(3000);