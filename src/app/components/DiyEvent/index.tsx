import React, { useEffect } from 'react'

export default function DiyEvent() {

    
    useEffect(() => {
        const dom = document.getElementById('di');
        const event = new Event('click');
        dom?.addEventListener('click', () => {
            console.log('触发了事件');
        })
        for(let i = 0 ; i < 10;i++){
            dom?.dispatchEvent(event);
        }
    },[])

  return (
    <div id='di'>
        这里用来实现一个自定义事件
    </div>
  )
}
