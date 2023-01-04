const mongodbConfig = require('../config/mongodbConfig')
const { ObjectId } = require('mongodb')


/*
// 리스트 생성
async function insertTodo(title, contents, done) {
    const db = mongodbConfig.getDbConnetion();
    const colletion = db.collection('post');

    await colletion.insertOne({
        title: title,
        contents: contents,
        done: done
    })
}

// 리스트 조회
async function findAllTodolist() {
    const db = mongodbConfig.getDbConnetion();
    const colletion = db.collection('post');

    return await colletion.find({}).toArray();
}

// 업데이트
async function updateTodo(id, title, contents, done) {
    const db = mongodbConfig.getDbConnetion();
    const colletion = db.collection('post');

    const todos = await colletion.find({ _id: ObjectId(id) }).toArray();
    if (todos.length == 0) {
        throw 'ID의 해당하는 게시물이 존재하지 않습니다'
    }

    await colletion.updateOne({
        _id: ObjectId(id)
    }, {
        $set: {
            title: title,
            contents: contents,
            done: done
        }
    })
}

// 삭제
async function deleteTodo(id) {
    const db = mongodbConfig.getDbConnetion();
    const colletion = db.collection('post');

    const todo = await colletion.find({ _id: ObjectId(id) }).toArray();
    if (todo.length == 0) {
        throw '해당 id가 존재하지않습니다'
    }

    await colletion.deleteOne({ _id: ObjectId(id) })

}
*/

//게시글 조회
exports.findNoticelist = async function () {
    const db = mongodbConfig.getDbConnetion();
    const colletion = db.collection('post');

    return await colletion.find().sort({timestamp: -1}).toArray()
}

// 선택 게시글 조회
exports.findDetailList = async function (id) {

    const db = mongodbConfig.getDbConnetion();
    const colletion = db.collection('post');

    return await colletion.find({ _id: ObjectId(id) }).toArray();
}

// 게시글작성
exports.insertWrite = async function (id, name, title, content, date) {
    const db = mongodbConfig.getDbConnetion();
    const colletion = db.collection('post');

    // const num = db.collection('counter').findOne({name:'totalcount'})
    // console.log(num);
    // console.log(num.totalpost,'토탈포스트');

    await colletion.insertOne({
        timestamp : new Date(),
        id: id,
        name: name,
        title: title,
        content: content,
        date: date
    })
}


// 게시글 삭제
exports.deletePost = async function (URL_id, id) {
    const db = mongodbConfig.getDbConnetion();
    const collection = db.collection('post');

    const post = await collection.findOne({ _id: ObjectId(URL_id) });
    if (!post) {
        throw new Error('게시물을 찾을 수 없습니다.');
    }

    if (post.id !== id) {
        throw new Error('Unauthorized');
    }

    await collection.deleteOne({ _id: ObjectId(URL_id) });
};

// 수정페이지 확인
exports.moveModify = async function(URL_id,id){
    const db = mongodbConfig.getDbConnetion();
    const collection = db.collection('post');

    const post =  await collection.findOne({_id : ObjectId(URL_id)})

    if(post.id != id){
        console.log('본인게시물 아님');
        throw new Error('본인 게시물이 아닙니다.')
    } else {
        console.log('맞음');
        return true
    }

}

// 수정완료
exports.post_modify = async function(id,title,content){
    const db = mongodbConfig.getDbConnetion();
    const collection = db.collection('post');

    await collection.updateOne({
        _id: ObjectId(id)
    }, {
        $set: {
            title: title,
            content: content
        }
    })
}


// exports.insertTodo = insertTodo;
// exports.findAllTodolist = findAllTodolist;
// exports.updateTodo = updateTodo;
// exports.deleteTodo = deleteTodo;