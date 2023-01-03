const express = require('express');
const session = require('express-session');

const path = require('path');
const todoappController = require('../controller/todoappcontroller');
const TodoAppLogincontroller = require('../controller/TodoappLogincontroller')



function init() {

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded());

  app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // https를 사용하는 경우 true로 변경해준다.
      maxAge: 3600000 // 1시간
    }
  }));

  // 정적파일 제공
  app.use('/view', express.static('C:\\Users\\MYCOM\\Desktop\\study\\view'));

  const router = makeAndGetrouter();
  app.use(router);
  app.listen(process.env.PORT);
}



function makeAndGetrouter() {
  const router = express.Router();

  router.get('/', (req, res) => {
    console.log(req.session.userId);
    res.sendFile(path.join(__dirname, '../view/main/main.html'));
  });

  router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/login/login.html'));
  })
  router.get('/sign', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/login/sign.html'));
  })

  router.get('/write', (req, res) => {
    if (req.session.user) {
      res.sendFile(path.join(__dirname, '../view/notice/write.html'));
    } else {
      res.send(`
            <script>
              alert('로그인을 해주세요');
              window.location.href = '/login';
            </script>
          `);
    }
  });

  router.get('/list', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/notice/list.html'));
  })
  router.get('/list/detail', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/notice/detail.html'));
  })



  // 로그인 & 회원가입
  // 회원가입
  router.post('/sign', TodoAppLogincontroller.sign)

  // 회원가입 아이디 중복확인
  router.post('/id-check', TodoAppLogincontroller.id_check)

  // 로그인
  router.post('/login', TodoAppLogincontroller.login)

  
  
  // 게시판
  // 게시글 조회
  router.get('/findnoticelist',todoappController.noticelist)

  // 게시글 상세 조회
  router.get('/detail-list',todoappController.detailList)

  
  // 게시글 작성
  router.post('/write', todoappController.write_post)



  return router;
}

exports.init = init;