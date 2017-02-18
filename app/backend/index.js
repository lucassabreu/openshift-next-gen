var express = require('express');
var Sequelize = require('sequelize');

console.log("Trying to connect database...");
var sequelize = new Sequelize(process.env.DATABASE_CONNECTION);
console.log("Setting routes...");
var app = express();
app.use(express.static('public'));

app.use(
    '/api/appointments', 
    require('./routes/appointments')(
        express.Router(),
        sequelize
    )
);

app.get('/health-check', (req, res) => {
  res.send('1');
});

console.log("Starting server...");
var port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('App listening on port ' + port + ' !');
});

