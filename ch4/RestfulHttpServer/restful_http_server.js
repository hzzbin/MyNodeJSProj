var http = require('http');
var url = require('url');
var items = [];

var server = http.createServer(function(req, res){
    switch (req.method) {
        case 'POST':
            var item = '';
            req.setEncoding('utf-8');
            
            //解析请求体监听
            req.on('data', function(chunk) {
                item += chunk;
            });
            req.on('end', function() {
                items.push(item);
                res.end('OK\n');
            });
            break;
        case 'GET':
            var body = items.map(function(item, i){
                return i + ') ' + item;
            }).join('\n');
            
            res.setHeader('Content-Length', Buffer.byteLength(body));
            res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
            res.end(body);
            
            
//            items.forEach(function(item, i){
//                res.write(i + ')' + item + '\n');
//            });
//            res.end();
            break;
        case 'DELETE':
            var path = url.parse(req.url).pathname;
            var i = parseInt(path.slice(1), 10);
            
            if (isNaN(i)) {
                res.statusCode = 400;
                res.end('Invalid item id');
            } else if (!items[i]) {
                res.satusCode = 404;
                res.end('Item not found');
            } else {
                items.splice(i, 1);
                res.end('OK\n');
            }
            break;
        case 'PUT':
            var path = url.parse(req.url).pathname;
            var param = parseInt(path.slice(1), 10);
            var i = param.split(":")[0]; // /1:newTask
            var newItem = param.split(":")[1];
            
            if (isNaN(i)) {
                res.statusCode = 400;
                res.end('Invalid item id');
            } else if (!items[i]) {
                res.satusCode = 404;
                res.end('Item not found');
            } else if (newItem == undefined) {
                res.statusCode = 400;
                res.end('Invalid new Item');
            } else {
                items[i] = newItem;
                res.end('OK\n');
            }
            break;
    }
});

































