//Express Set
var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();
var bodyParser = require('body-parser');
//Allows you to use req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//MIDDLEWARE
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));


// getting-started.js Mongoose
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/test-explain');


var Comment = require("./models/comment.js"); //Allows use to use the Comment model here
var Post = require("./models/post.js");

//User authentication

var jwt = require('express-jwt');
var cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(jwt({
    secret: 'shhhhhhared-secret',
    getToken: function fromHeaderOrCookie (req) { //fromHeaderOrQuerystring
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
      } else if (req.cookies && req.cookies.token) {
        return req.cookies.token;
      }
      return null;
    }
}).unless({path: ['/', '/login', '/signup']}));

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.redirect('/login');
    }
});

require("./resources/posts")(app);


//Create comments
app.post('/comments', function (req, res) {
    Post.findById(req.body.post).exec(function (err, post) {
        var comment = req.body;
        Comment.create(comment, function(err, comment){
            if (err){ return res.status(300) };
            post.comments.push(comment);
            post.save(function (err) {
                if (err){ return res.status(300) };
                console.log(post.comments);
                res.status(200).json(comment);
            });
        });
    });
});


//mailer
// project/app.js

// var app = require('express')(),
//     mailer = require('express-mailer');
//
// mailer.extend(app, {
//   from: 'no-reply@example.com',
//   host: 'smtp.gmail.com', // hostname
//   secureConnection: true, // use SSL
//   port: 465, // port for secure SMTP
//   transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
//   auth: {
//     user: 'gmail.user@gmail.com',
//     pass: 'userpass'
//   }
// });
//Secure socket layer, received a certification through a check through a DNS...HTTPS AND SSL are the same

//DEPLOY
app.listen(process.env.PORT || 3000, function(){

});

module.exports = app;
