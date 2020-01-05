var express = require('express');
var path = require('path');
var logger = require('morgan');
var helmet = require('helmet');
var session = require('express-session');// <------- ?
var methodOverride = require('method-override')

var indexRouter = require('./src/routes/home.route');
var pessoassRouter = require('./src/routes/pessoa.route');

var app = express();

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(helmet());
app.disable('x-powered-by');
app.use(methodOverride('_method'))

app.use('/', indexRouter);
app.use('/pessoa', pessoassRouter);

app.set('trust proxy', 1);
var expiryDate = new Date( Date.now() + 60 * 60 * 1000 );
app.use(session({
    secret: '#s7w@a',
    name: 'xtrem',
    proxy: true,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: true,
      httpOnly: true,
      expires: expiryDate
    }
}));

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(function(req, res, next){
  let err = new Error('not found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next){
	try{
		if(err.status === 404){
			res.status(404).json({message: "not found"});
		}else{
			res.status(500).json({message: "something wrong"});
		}
	}catch(err){
		console.log('error na aplicação')
	}
});

module.exports = app;
