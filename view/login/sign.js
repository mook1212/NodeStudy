
document.getElementById('sign').addEventListener('click', () => {
    // Validate id
    const idRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{1,8}$/;
    const id = document.getElementById('id').value;
    if (!idRegex.test(id)) {
      alert('아이디를 다시 확인 하여 주세요. 아이디는 영어 소문자와 숫자 한자리씩 포함하고 최대 8자리로 작성하여 주세요');
      return;
    }
    
    // Validate password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const password = document.getElementById('pw').value;
    if (!passwordRegex.test(password)) {
        alert(`비밀번호를 다시 확인 하여 주세요.
        비밀번호는 영어 대,소문자와 숫자,특수문자 한자리를 포함하여 작성하여 주세요.
        `);
        return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = document.getElementById('email').value;
    if (!emailRegex.test(email)) {
        alert('Invalid email address');
        return;
    }

    // Send POST request if all validation checks pass
    const name = document.getElementById('name').value;
    const nickname = document.getElementById('nickname').value;
    $.post('/sign', {
        name: name,
        id: id,
        pw: password,
        email: email,
        nickname: nickname
    })
        .done((res) => {
            console.log(res);
            if (res) {
                alert('회원가입성공!');
                location.href = '/';
            } else {
                alert('회원가입 실패 다시한번 확인 해주세요');
            }
        });
});

document.getElementById('id_check').addEventListener('click',()=>{
    const id = document.getElementById('id').value

    $.post('/id-check',{
        id : id
    })
    .done((res)=>{
        console.log(res);
        if(!res){
            alert('아이디를 다시 확인하여 주세요')
        } else {
            alert('사용 가능한 아이디 입니다.')
        }
    })
})