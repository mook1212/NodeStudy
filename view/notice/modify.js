let URL_id = new URLSearchParams(window.location.search)
const id = URL_id.get('id')

let data = [];
$.ajax({
    url: '/detail-list',
    method: 'get',
    data: {
        id: id
    }
}).done((res) => {
    console.log(res);

    document.getElementById('title').value = res[0].title
    document.getElementById('content').value = res[0].content

})

// 수정확인
document.getElementById('success').addEventListener('click',()=>{

    const title = document.getElementById('title').value
    const content = document.getElementById('content').value
    
    $.ajax({
        url : '/detail/modify/update',
        method : 'put',
        data : {
            id : id,
            title : title,
            content : content
        }
    }).done((res)=>{
        console.log(res);
        if(res === true){
            alert('수정완료')
        } else {
            alert('로그인 ㄱㄱ')
        }
    })
})

// 취소
document.getElementById('cancel').addEventListener('click',()=>{
    window.history.go(-1);
});

