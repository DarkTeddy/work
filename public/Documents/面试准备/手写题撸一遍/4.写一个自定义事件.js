const event = new Event('dingzhi');

const dom = document.getElementById('id');

id.addEventListener('dingzhi',
    function(){
        console.log('dingzhi');
    }
)

id.dispatchEvent(event);

const a = new Event()