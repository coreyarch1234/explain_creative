var User = require('../models/user.js');
var jwt = require('jsonwebtoken');
var Post = require("../models/post.js");

module.exports = function(app) {

    //Index route
    app.get('/', function (req, res) {
        Post.find().exec(function(err, posts){
            res.render('home', {posts: posts});
        });
    });

    //Posts Create route. Post posts. Save to database.
    app.post('/posts', function(req, res){
        var post = req.body;
        post.youtubeToken = post.youtubeToken.split("=")[1];

        Post.create(post, function(err, post){
            if (err){ return res.status(300) };
            res.status(200).json(post);
        });

    });
    app.get('/new', function (req, res) {
        Post.find().exec(function(err, posts){
            res.render('posts-new', {posts: posts});
        });
    });

    //Posts show
    app.get('/posts/:id', function(req, res){
        Post.findById(req.params.id).populate('comments').exec(function(err, post){
            res.render('posts-show', {post: post});
        });
    });

    //Display the edit form
    app.get('/posts/:id/edit', function(req, res){
        Post.findById(req.params.id).exec(function(err, post){
            res.render('posts-edit', {post: post});
        });
    });

    //Posts Update
    app.put('/posts/:id', function(req, res){
        console.log(req.params.id)
        Post.findById(req.params.id).exec(function(err, post){
            if (err){ return res.status(300) };
            post.body = req.body.body;
            // save the post
            post.save(function(err, post) {
                if (err) { return res.send(err) };
                res.send(post);
            });
        });
    });

    //Posts delete
    app.delete('/posts/:id', function(req, res){
        Post.findById(req.params.id).exec(function(err, post){
            post.remove();
            res.status(200).json({});
        });
    });


    //Signup/Login
    app.get('/signup', function(req, res){
      res.render('signup');

    });

    app.post('/signup', function(req, res){
        console.log(req.body)
        var user = new User();
        user.first = req.body.first;
        user.last = req.body.last;
        user.email = req.body.email;
        user.password = req.body.password;
        user.save(function(err){
            if (err){ return res.status(300) };
            var token = jwt.sign({ _id: user._id }, 'shhhhhhared-secret');
            console.log("hi")
            res.send({ token: token })
        });
    });

    app.get('/login', function(req, res){
      res.render('login');
    });

    app.post('/login', function(req, res){
        User.findOne({email: req.body.email}, function(err, user){
            if (err){ return res.status(300) };
            if (!user) {
                res.send({ success: false, message: 'Authentication failed. User not found.' });
            }
            else {
                user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {
                  // Create token if the password matched and no error was thrown
                  var token = jwt.sign(user, 'shhhhhhared-secret', {
                    expiresIn: 10080 // in seconds
                  });
                //   res.json({ success: true, token: 'JWT ' + token });
                res.send({ token: token })
                }
                else {
                  res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
                };
              });
          };

    });
});

};
