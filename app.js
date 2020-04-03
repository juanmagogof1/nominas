// Require packages and set the port
const express = require('express');
const port = 3000;
const bodyParser = require('body-parser');
const routes = require('./routes/routes')
const app = express();
const path = require('path');
const hbs = require('hbs');

// Use Node.js body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.set('./views',path.join(__dirname,'views'));
app.set('view engine', 'hbs');
app.use('/assets',express.static(__dirname + '/public'));
routes(app);

// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${server.address().port}`);
});
