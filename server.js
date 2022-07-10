//required libraries
const express = require('express');
// const chalk = require('chalk');
const routes = require('./controllers');
const http = require('http');
const socket = require('socket.io');

const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const path = require('path');
const session = require('express-session');

const sequelize = require('./config/connection');

const app = express();
const server = http.createServer(app);
//bring in socket module
require('./websocket')(server);
const PORT = process.env.PORT || 3001;

// Define template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// this allows you to parse the body of the request
app.use(express.json());
// // this allows you to use the req.body object to access the body of the request
app.use(express.urlencoded({ extended: true }));
// this allows you to use a static folder (unchanged files)
app.use(express.static(path.join(__dirname, 'public')));

//blank users object to store all the users connected to the server;

//settinng up event for when user connects
//session config
// const sess = {
//     secret: 'Super secret secret',
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24, // 2 weeks (just an example, you can decide how long to keep session alive)
//   },
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize,
//   }),
// };

// app.use(session(sess));

//defined routes for the app
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () =>
    console.log(`🌎 API Server now listening on http://localhost:${PORT} 🌎`)
  );
});
