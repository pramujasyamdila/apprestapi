const express = require('express');
const bodyParser = require('body-parser');

var morgan = require('morgan');
const app = express();


//parser aplication jasson

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

//pangil routes 
var routes = require('./routes');
routes(app);

//daftarkan menu rotes dari index
app.use('/auth', require('./midleware'));

app.listen(3000, () => {
    console.log(`Server started on port`);
});