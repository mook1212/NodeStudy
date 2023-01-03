let URL_id = new URLSearchParams(window.location.search)

const a = 123
console.log(typeof(URL_id.get('id')));
const id = URL_id.get('id')
console.log(id);

$.ajax({
    url : '/detail-list',
    method : 'get',
    data : {
        id:id
    }
}).done((res)=>{
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