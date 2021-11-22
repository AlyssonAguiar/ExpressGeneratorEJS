var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;


var indexRouter = require('./routes/index');
var cadastroPessoasRouter = require('./routes/cadastroPessoa');
var cadastroSalasRouter = require('./routes/cadastroSalas');
var dadosPessoaRouter = require('./routes/dadosPessoa');
var dadosSalaRouter = require('./routes/dadosSala');
var tabelaPessoaRouter = require('./routes/tabelaPessoa');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/cadastroPessoa', cadastroPessoasRouter);
app.use('/cadastroSalas', cadastroSalasRouter);
app.use('/dadosPessoa', dadosPessoaRouter);
app.use('/dadosSala', dadosSalaRouter);
app.use('/tabelaPessoa', tabelaPessoaRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

app.get('/', (req, res) => {
    res.render('index.ejs')
})

// Conexão com MongoDB Atlas
const url = "mongodb+srv://leojportes:33693422@cluster0.cc09x.mongodb.net/test?retryWrites=true&w=majority"

app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect(url)
    .then(client => {
        const db = client.db('forms')
        const quotesCollection = db.collection('quotes')

        // Método post 
        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
              .then(result => {
                console.log(result)
              })
              .catch(error => console.error(error))
          })

        // Método Get


    })