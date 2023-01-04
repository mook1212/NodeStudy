const mongodbConfig = require('../config/mongodbConfig')
const TodoAppservice = require('../service/TodoAppservice')


/*
function index(req, res) {
    res.send('hello nodejs')
}

// title, contents, done 받아서 db에 저장
async function saveTodo(req, res) {
    const title = req.body.title
    const contents = req.body.contents
    const done = req.body.done

    if (title == null || contents == null || done == null) {
        res.status(400).send({ message: '올바른 파라미터를 넘겨주세요' })
        return;
    }
    await TodoAppservice.insertTodo(title, contents, done);
    res.sendStatus(200);
}

// 게시글 전체 조회
async function todolist(req, res) {
    // 전체 todo를 반환함
    const todo = await TodoAppservice.findAllTodolist();
    res.status(200).send(todo)
}

async function updateTodo(req, res) {
    const id = req.body.id
    const title = req.body.title
    const contents = req.body.contents
    const done = req.body.done

    if (id == null || title == null || contents == null || done == null) {
        res.status(400).send({ message: '올바른 파라미터를 넘겨주세요' })
        // return을 쓰기 싫으면 else문으로 넘어가도 된다.
        return;
    }

    try {
        await TodoAppservice.updateTodo(id, title, contents, done)
        res.sendStatus(200);
    } catch (e) {
        res.status(400).send({ message: e })
    }
}

// 게시글 삭제
async function deleteTodo(req, res) {
    const id = req.params.id;

    if (id == null) {
        res.status(400).send({ message: '올바른 아이디를 넘겨주세여' })
        return;
    }

    try {
        await TodoAppservice.deleteTodo(id)
        res.sendStatus(200);
    } catch (e) {
        res.status(400).send({ message: e })
    }
}
*/

// 게시글 조회
exports.noticelist = async function (req, res) {

    const list = await TodoAppservice.findNoticelist();
    res.status(200).send(list)
}

// 선택한 게시글 조회

exports.detailList = async function (req, res) {
    const id = req.query.id
    const list = await TodoAppservice.findDetailList(id);
    res.status(200).send(list)
}

// 게시글 작성
exports.write_post = async function (req, res) {
    const db = mongodbConfig.getDbConnetion();

    // 세션 로그인 유저 정보
    const id = req.session.user._id
    const name = req.session.user.nickname

    // 입력 내용
    const title = req.body.title
    const content = req.body.content
    const date = req.body.date


    if (!req.session.user) {
        res.status(200).send({ message: '로그인 해야함' })
    }

    if (title == '' || content == '') {
        res.status(200).send({ message: '제목과 내용을 작성하여 주세요' })
        return
    }

    try {
        await TodoAppservice.insertWrite(id, name, title, content, date)
        // db.collection('counter').updateOne({ name: '총게시물' }, { $inc: { totalpost: 1 } })
        res.send(true)
    } catch {
        res.status(400).send({ message: '실패' })
    }
}

// 게시글 삭제
exports.delete_Post = async function (req, res) {
    const URL_id = req.body.URL_id;
    const user = req.session.user;

    if (!user) {
        return res.status(200).send({ message: '로그인 해야함' });
    }

    try {
        await TodoAppservice.deletePost(URL_id, user._id);
        res.send(true)
    } catch (error) {
        if (error.message === '게시물을 찾을 수 없습니다.') {
            return res.status(200).send({ message: error.message });
        } else if (error.message === 'Unauthorized') {
            return res.status(200).send({ message: '본인 게시물이 아닙니다.' });
        } else {
            res.status(400).send({ message: '실패' });
        }
    }
};

// 수정페이지 확인
exports.moveModifyPage = async function(req,res){
    const URL_id = req.query.URL_id;
    const user = req.session.user;

    console.log(URL_id);
    if(!user){
        return res.status(200).send({message: '로그인 해야함'})
    }

    try {
        await TodoAppservice.moveModify(URL_id,user._id)
        res.send(true)
    } catch(error) {
        if(error.message === '본인 게시물이 아닙니다.'){
            return res.status(200).send({message:error.message})
        }
    }
}

// 수정완료
exports.postModify = async function(req,res){
    const id = req.body.id
    const title = req.body.title
    const content = req.body.content
    const user = req.session.user;

    if(!user){
        return res.status(200).send({message : '로그인 해야함'})
    }

    try{
        await TodoAppservice.post_modify(id,title,content)
        res.send(true)
    } catch {
        res.status(200).send({message : '실패'})
    }



}


// exports.index = index;
// exports.saveTodo = saveTodo;
// exports.todolist = todolist;
// exports.updateTodo = updateTodo;
// exports.deleteTodo = deleteTodo;