process.env.MONGO_URL = 'mongodb://localhost:27017/test';
process.env.PORT = 8080;
require('./app/core/mongoose')
require('./app/core/router')