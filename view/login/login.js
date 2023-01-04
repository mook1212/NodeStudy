
document.getElementById('login').addEventListener('click', () => {

    const id = document.getElementById('id').value
    const pw = document.getElementById('pw').value

    console.log(id);

    $.post('/login', {
        id: id,
        pw: pw
    })
        .done((res) => {
            if (res) {
                sessionStorage.setItem('user', res._id);
                location.href = '/'
            } else {
                alert('아이디 혹은 비밀번호를 다시 확인하여 주세요.')
            }
        })
})