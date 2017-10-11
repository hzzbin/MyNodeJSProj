var connect = require('connect');
var router = require('./middleware/router');
var app = connect();
app.use(logger);
app.use(hello);
app.listen(3000);

function logger(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
}

function hello(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello world');
}

//简单的Basic用户权限认证
function restrict(req, res, next) {
    var authorization = req.headers.authorization;
    if (!authorization) return next(new Error('Unauthorized'));
    
    var parts = authorization.split(' ');
    var scheme = parts[0];
    var auth = new Buffer(parts[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    
    authenticateWithDatabase(user, pass, function (err) {
        if (err) return next(err);
        
        next();
    });
}


function admin(req, res, next) {
    switch (req.url) {
        case '/':
            res.end('try /users');
            break;
        case '/users':
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(['tobi', 'loki', 'jane']));
            break;
        }
}

//创建可配置的中间件组件
//function setup(options) {
//    //设置逻辑
//    
//    return function(req, res, next) {
//        //中间件逻辑
//    }
//}

//app.use(setup({some: 'options'}));

//可配置的Connect中间件组件logger
function setup(format) {
    var regexp = /:(\w+)/g;
    
    return function logger(req, res, next) {
        var str = format.replace(regexp, function(match, property) {
            return req[property];
        });
        
        console.log(str);
        
        next();
    }
}

module.exports = setup;



//构建可配置的路由中间件组件
var routes = {
    GET: {
            '/users': function(req, res) {
                res.end('tobi, loki, ferret');
            },
            '/user/:id': function(req, res, id) {
                res.end('user ' + id);
            }
        },
    DELETE: {
        '/user/:id': function(req, res, id) {
            res.end('deleted user ' + id);
        }
    }
};
connect.use(router(routes));


//构建一个重写URL的中间件组件
var connect = require('connect');
var url = require('url');
var app = connect()
.use(rewrite)
.use(showPost)
.listen(3000);

var path = url.parse(req.url).pathname;

function rewrite(req, res, next) {
    var match = path.match(/^\/blog\/posts\/(.+)/);
    if (match) {
        findPostIdBySlug(match[1], function(err, id) {
            if (err) return next(err);
            if (!id) return next(new Error('User not found'));
            req.url = '/blog/posts/' + id;
            next();
        });
    } else {
        next();
    }
}

//The result of NVIDIA GRID is nirvana for the gamer. When service operators use NVIDIA GRID as the foundation for their on-demand Gaming as a Service (GaaS) solution, you can experience tremendous advantages over traditional console gaming systems.
//
//Any-device gaming: High-quality, low-latency, multi device gaming on any PC, Mac, tablet, smartphone or TV.
//Click-to-play simplicity: Anytime access to a library of gaming titles and saved games in the cloud. Play or continue games from any device, anywhere.
//Less hassle: No new hardware. No complicated setup. No game discs. No digital downloads. No game installations. No game patches.


//给connect添加错误处理中间件
//connect 默认的错误处理:设置状态码500，添加文本“Internal Server Error”
function errorHandler() {
    var env = process.env.NODE_ENV || 'development';
    return function(err, req, res, next) {
        
        res.statusCode = 500;
        switch (env) {
            case 'development':
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(err));
                break;
            default:
                res.end('Server error');
        }
    }
}

//使用多个错误处理中间件
var api = connect()
    .use(users)
    .use(pets)
    .use(errorHandler);

var app = connect()
    .use(hello)
    .use('/api', api)
    .use(errorPage)
    .listen(3000);

function hello(req, res, next) {
    if (req.url.match(/^\/hello/)) {
        res.end('Hello World\n');
    } else {
        next();
    }
}

var db = {
    users: [
        { name: 'tobi' },
        { name: 'loki' },
        { name: 'jane' }
    ]
};

function users(req, res, next) {
    var match = req.url.match(/^\/user\/(.+)/);
    if (match) {
        var user = db.users[match[1]];
        if (user) {
            res.setHeader('Content-Type'. 'application/json');
            res.end(JSON.stringify(user));
        } else {
            var err = new Error('User not found');
            err.notFound = true;
            next(err);
        }
    } else {
        next();
    }
}

function pets(req, res, next) {
    if (req.url.match(/^\/pet\/(.+)/)) {
        foo();
    } else {
        next();
    }
}

function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.setHeader('Content-Type', 'application/json');
    if (err.notFound) {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: err.message }));
    } else {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Internal Server Error'}));
    }
}

function errorPage(err, req, res, next) {
    res.statusCode = 500;
    res.end('Oops, some error occurred!');
    
}



















