const mongodbConfig = require('../config/mongodbConfig')
const { ObjectId } = require('mongodb')
const crypto = require('crypto');


// 회원가입
exports.sign_up = async function (name,id, pw, email, nickname) {
    const db = mongodbConfig.getDbConnetion();
    const colletion = db.collection('sign');

    const passwordHash = crypto.createHash('sha256').update(pw).digest('hex');

    await colletion.insertOne({
        name: name,
        id: id,
        pw: passwordHash,
        email : email,
        nickname: nickname
    });
}

// 회원가입 아이디 중복확인

exports.idcheck = async function(id){
    const db = mongodbConfig.getDbConnetion();
    const colletion = db.collection('sign');

    const user = await colletion.findOne({id : id})
    // console.log(user.id);
    console.log(user,'서비스부분');
    if(user){
        console.log(123);
        return false
    } else {
        console.log(111);
        return true
    }
}

// 로그인
exports.Applogin = async function (id, pw) {
    const db = mongodbConfig.getDbConnetion();
    const collection = db.collection('sign');

    const passwordHash = crypto.createHash('sha256').update(pw).digest('hex');

    const user = await collection.findOne({ id: id, pw: passwordHash });
    console.log(user);
    if (user) {
        return {'_id' : user._id, 'nickname' : user.nickname}; // login successful
    } else {
        return false; // login failed
    }
}
