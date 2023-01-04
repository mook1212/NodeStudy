let URL_id = new URLSearchParams(window.location.search)
const id = URL_id.get('id')

$.ajax({
    url: '/detail-list',
    method: 'get',
    data: {
        id: id
    }
}).done((res) => {
    console.log(res);

    $('.info').append(`            
    <p class="title">${res[0].title}</p>
    <div class="box1">
        <p class="name">${res[0].name}</p>
        <p class="date">${res[0].date}</p>
    </div>`)

    $('.text').append(`
        <p class="text">${res[0].content}</p>
    `)
})


// 게시글 삭제
document.getElementById('delete').addEventListener('click', () => {

    $.ajax({
        url: '/delete-post',
        method: 'delete',
        data: {
            URL_id: id
        }
    }).done((res) => {
        console.log(res);
        if (res === true) {
            alert('삭제완료')
            location.href = '/list'
        } else if (res.message === '게시물을 찾을 수 없습니다.') {
            alert(res.message);
        } else if (res.message === '본인 게시물이 아닙니다.') {
            alert(res.message);
        } else if (res.message === '로그인 해야함') {
            alert(res.message)
        }
    });
});

// 게시글 수정
document.getElementById('modify').addEventListener('click',()=>{

    $.ajax({
        url : '/list/detail/modify-confirm',
        method : 'get',
        data:{
            URL_id : id,
            id : sessionStorage.getItem('user')
        }
    }).done((res)=>{
        console.log(res);
        if(res.message === '로그인 해야함'){
            alert(res.message)
        } else if(res.message === '본인 게시물이 아닙니다.'){
            alert(res.message)
        } else {
            location.href = `/detail/modify?id=${id}`
        }
    })

    
})
