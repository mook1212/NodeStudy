require('dotenv').config()
const config = require('./config/exressConfig');
const mongodbConfig = require('./config/mongodbConfig');

(async function(){
   config.init();
    await mongodbConfig.init(process.env.DB_URL);
})()

