process.env.MONGO_URL = 'mongodb://localhost:27017/test';
//process.env.MONGO_URL = 'mongodb://uAxwrYvVoXJzK45c:pCPGLnufBavID0HQb@10.10.72.139:27017/ZedRHpOCXtz8ik1W';
process.env.PORT = 8080;
require('./app/core/mongoose')
require('./app/core/router')