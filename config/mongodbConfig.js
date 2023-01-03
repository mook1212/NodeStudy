const mongodb = require('mongodb')

let db; // 전역변수
async function init(url) {
    const mongoClient = new mongodb.MongoClient(url);
    await mongoClient.connect();
    db = mongoClient.db('todo');
}

function getDbConnetion() {
    return db;
}

exports.init = init;
exports.getDbConnetion = getDbConnetion;