const TodoAppLogin = require('../service/TodoAppLogin')


// 회원가입
exports.sign = async function(req, res) {
    const name = req.body.name
    const id = req.body.id
    const pw = req.body.pw
    const email = req.body.email
    const nickname = req.body.nickname

    const idRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{1,8}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (name == '' || !idRegex.test(id) || !passwordRegex.test(pw) || nickname == '' || !emailRegex.test(email)) {
        res.status(200).send(false)
        return;
    }

    await TodoAppLogin.sign_up(name,id, pw, email,nickname)
    res.status(200).send(true);
}

// 회원가입 아이디 중복확인
exports.id_check = async function(req,res){
    const idRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{1,8}$/;
    const id = req.body.id

    if(!idRegex.test(id)){
        res.send(false)
        return
    }

    const result = await TodoAppLogin.idcheck(id)
    res.send(result)
}

// 로그인
exports.login = async function(req, res) {
    const id = req.body.id;
    const pw = req.body.pw;

    if (id == null || pw == null) {
        res.status(400).send({ message: '아이디 혹은 비밀번호를 확인하여 주세요' });
        return;
    }
    const result = await TodoAppLogin.Applogin(id, pw);

    // console.log(result);

    if (result) {
        req.session.user = result;
        // sessionStorage.setItem('user', req.session.user);
        res.status(200).send(result);
    } else {
        res.send(result);
    }
}
