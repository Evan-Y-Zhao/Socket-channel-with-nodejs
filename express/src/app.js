import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const moduleAlias = require('module-alias')
moduleAlias.addAliases({
  "@root": __dirname,
  "@sockets": path.resolve(__dirname, './sockets'),
  "@amqps": path.resolve(__dirname, './amqps'),
  "@store": path.resolve(__dirname, './store'),
  "@routes": path.resolve(__dirname, './routes'),
  "@utils": path.resolve(__dirname, './utils'),
  "@uploads": path.resolve(__dirname, './uploads')
})

const storage = require('@store/storage').default
storage.readFromJSON() // initialize memorage storage when app restarts

require('dotenv').config()

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign');
const allowOrigin = process.env.NODE_ENV !== 'production' ? '*' : process.env.API_GATEWAY

const app = express();
app.disable('x-powered-by');

// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

// cors configuraton. Allow * for the time being
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', allowOrigin);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware

  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);
  next();
});

app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, '../public')));

// Routes
const index = require('./routes/index');
const health = require('./routes/health');
const user = require('./routes/user');
const role = require('./routes/role');
const instrument = require('./routes/instrument');
const permission = require('./routes/permission');
const factor = require('./routes/factor');
const uploadFile = require('./routes/uploadFile');
const company = require('./routes/company');
const dictionary = require('./routes/dictionary');
const airDashboard = require('./routes/airDashboard');
const station = require('./routes/station');
const protocol = require('./routes/protocol');
const report = require('./routes/report');
const alarm = require('./routes/alarm');
const geographicMap = require('./routes/geographicMap');
const notification = require('./routes/notification');

let prefixUrl = ''

if (process.env.NODE_ENV !== 'production') {
  prefixUrl = '/api/bff'
  const auth = require('./routes/auth')
  app.use('/api/auth', auth);
}
app.use('/login', index);
app.use('/health', health);
app.use(prefixUrl + '/auth/user', user);
app.use(prefixUrl + '/auth/role', role);
app.use(prefixUrl + '/auth/permission', permission);
app.use(prefixUrl + '/instrument', instrument);
app.use(prefixUrl + '/factor', factor);
app.use(prefixUrl + '/upload', uploadFile);
app.use(prefixUrl + '/dictionary', dictionary);
app.use(prefixUrl + '/air/dashboard', airDashboard);
app.use(prefixUrl + '/air/report', geographicMap);

app.use(prefixUrl + '/company', company);
app.use(prefixUrl + '/station', station);
app.use(prefixUrl + '/report', report);
app.use(prefixUrl + '/protocol', protocol);
app.use(prefixUrl + '/alarm', alarm);

app.use(prefixUrl + '/notification', notification);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(err)
  res
    .status(err.status || 500)
    .json({
      'response': err.message
    });
});

process.on('SIGINT', () => {
  console.log('do SIGINT');
  storage.writeToJSON()
  process.exit();
});
process.stdout.on('error', (err) => {
  console.log("stdout error")
  storage.writeToJSON()
  console.err(err)
})

process.on('uncaughtException', (err) => {
  storage.writeToJSON()
  console.log('uncaughtException: ' + err)
});


export default app;
