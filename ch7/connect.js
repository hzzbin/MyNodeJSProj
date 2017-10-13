//connect自带的中间件

//解析HTTP cookie
//cookieParser()支持常规cookie、签名cookie和特殊的JSON cookie
var connect = require('connect');
var app = connect()
    .use(connect.cookieParser('tobi is a cool ferret'))
    .use(function(req, res) {
        console.log(req.cookies);
        console.log(req.signedCookies);
        res.end('hello\n');
    }).listen(3000);

//设定出站cookie
var connect = require('connect');

var app = connect()
    .use(function(req, res) {
        res.setHeader('Set-Cookie', 'foo=bar');
        res.setHeader('Set-Cookie', 'tobi=ferret; Expires=Tue, 08 Jun 2021 10:18:14 GMT');
        res.end();
    }).listen(3000);

//bodyParser(): 解析请求体
//JSON、x-www-form-urlencoded、multipart/form-data
var app = connect()
    .use(connect.bodyParser())
    .use(function(req, res) {
        // .. 注册用户 ..
        res.end('Registered new user: ' + req.body.username);
     });

//解析multipart <form>数据
var app = connect()
    .use(connect.bodyParser())
    .use(function(req, res){
        console.log(req.body);
        console.log(req.files);
        res.end('thanks!');
    });

//使用limit限制请求主体body的大小
var app = connect()
    .use(connect.limit('32kb'))
    .use(connect.bodyParser())
    .use(hello);

http.createServer(app).listen(3000);

//根据请求的Content-Type限制主体大小
function type(type, fn) {
    return function(req, res, next) {
        var ct = req.headers['content-type'] || '';
        if (0 != ct.indexOf(type)) {
            return next();
        }
        fn(req, res, next);
    }
}

var app = connect()
    .use(type('application/x-www-form-urlencoded', connect.limit('32kb')))
    .use(type('image', connect.limit('2mb')))
    .use(type('video', connect.limit('300mb')))
    .use(connect.bodyParser())
    .use(hello);

//query() 
var app = connect()
    .use(connect.query())
    .use(function(req, res, next){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(req.query));
    });


//使用logger
var connect = require('connect');

var app = connect()
    .use(connect.logger(':methos :url :response-time ms'))
    .use(hello)
    .listen(3000);

//favicon地址栏和收藏栏里的小图标
connect()
    .use(connect.favicon(__dirname + '/public/favicon.ico'))
    .use(connect.logger())
    .use(function(req, res) {
    res.end('Hello World!\n');
});

//methodOverride:伪造HTTP方法
//...

//vhost():虚拟主机
var connect = require('connect');

var server = connect();
var app = require('./sites/expressjs.dev');

server.use(connect.vhost('expressjs.dev', app));

server.listen(3000);

var http = require('http');
module.exports = http.createServer(function(req, res){
    res.end('hello from expressjs.com\n');
});


//使用session的页面浏览计数器
var connect = require('connect');

var hour = 3600000;
var sessionOpts = {
    key: 'myapp_sid',
    cookie: { maxAge: hour * 24, secure: true } //设置过期时间和只在使用HTTPS时才发送会话cookie
};

var app = connect()
    .use(connect.favicon())
    .use(connect.cookieParser('keyboard cat'))
    .use(connect.session())
    .use(function(req, res, next){
        var sess = req.session;
        if (sess.views) {
            res.setHeader('Content-Type', 'text/html');
            res.write('<p>views: ' + sess.views + '</p>');
            res.end();
            sess.views++;
        } else {
            sess.views = 1;
            res.end('welcome to the session demo. refresh!');
        }
    });

app.listen(3000);

//connect安全中间件
//basicAuth

//csrf()

//errorHandler():开发错误处理








































