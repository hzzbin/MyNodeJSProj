var express = require('express');
var router = express.Router();

var Photo = require('../models/Photo');
var path = require('path');
var fs = require('fs');
var join = path.join;

var photos = [];
photos.push({
    name: 'Node.js Logo',
    path: 'http://nodejs.org/images/logos/nodejs-green.png'
});

photos.push({
    name: 'Ryan Speaking',
    path: 'http://nodejs.org/images/ryan-speaker.jpg'
});

//router.get('/', function(req, res, next) {
//    Photo.find({}, function(err, photos) {
//        if (err) return next(err);
//        res.render('photos', {
//            title: 'Photos',
//            photos: photos
//        });
//    });
//});
//
//router.get('photos/upload', function(req, res, next) {
//    res.render('photos/upload', {
//        title: 'Photo upload'
//    });
//});
//
//exports.submit = function (dir) {
//    return router.post('photos/upload', function(req, res, next) {
//        var img = req.files.photo.image;
//        var name = req.body.photo.name || img.name;
//        var path = join(dir, img.name);
//        
//        fs.rename(img.path, path, function(err){
//            if (err) return next(err);
//            
//            Photo.create({
//                name: name,
//                path: img.name
//            }, function (err) {
//                if (err) return next(err);
//                res.redirect('/');
//            });
//        });
//    });
//};

//module.exports = router;

exports.list = function(req, res, next){
  Photo.find({}, function(err, photos){
    if (err) return next(err);
    res.render('photos', {
      title: 'Photos',
      photos: photos
    });
      console.log(photos);
  });
};

exports.form = function(req, res){
  res.render('photos/upload', {
    title: 'Photo upload' 
  });
};

exports.submit = function (dir) {
  return function(req, res, next){
    var img = req.file;
      console.log(req.body);
    var name = req.body.imgName || img.originalname;
    var path = join(dir, img.originalname);

    fs.rename(img.path, path, function(err){
      if (err) return next(err);

      Photo.create({
        name: name,
        path: img.originalname
      }, function(err) {
        if (err) return next(err);
        res.redirect('/');
      });
    });
  };
};


exports.download = function(dir){
    return function(req, res, next){
        var id = req.params.id;
        Photo.findById(id, function(err, photo) {
            if(err) return next(err);
            var path = join(dir, photo.path);
            //res.sendfile(path);
            res.download(path);
        });
    };
};




















