document.getElementById('write').addEventListener('click', () => {

    const title = document.getElementById('title').value
    const content = document.getElementById('content').value

    const DATE = new Date();
    const year = DATE.getFullYear();
    const month = DATE.getMonth(); // returns a zero-based month (0-11)
    const day = DATE.getDate();

    const date = year + '.' + month + 1 + '.' + day




    $.post('/write', {
        title: title,
        content: content,
        date: date
    })
        .done((res) => {
            console.log(res);
            if (res) {
                alert('게시글 작성 완료')
            } else {
                // alert('')
            }
        })

})

// $.get('/findnoticelist')
// .done((res)=>{
//     console.log(res);
// })
