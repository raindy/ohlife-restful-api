//process.env.MONGO_URL = 'mongodb://localhost:27017/test';
process.env.MONGO_URL = 'mongodb://user:pwd@localhost:27020/testing';
process.env.PORT = 8080;
require('./app/core/mongoose')
require('./app/core/router')