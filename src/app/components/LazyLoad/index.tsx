'use client'
import React, { useEffect, useRef, useState } from 'react';
import './index.css';

const data = new Array(10).fill(0);
function getAsyncData(){
    console.log('getAsyncData');
    
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data.slice(3,4))
        }, 500)
    })
}
export default function LazyLoad() {

    
    const [showData, setShowData] = useState(data.slice(0,3))

    function handleScroll(){
        
        const {scrollHeight, clientHeight, scrollTop } = document.documentElement;
        console.log(scrollHeight, clientHeight, scrollTop);
        
        // 判断html元素是否滚动到底部
        if(scrollHeight - (clientHeight + scrollTop) < 1){
            console.log('滚动到底部了');
            
            // 如果滚动到底部，就要添加
            getAsyncData().then(res => {
                console.log(res, 'res');
                setShowData(prev => prev.concat(res))
            })
        }
    }

    useEffect(() => {
        
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    },[])

  return (
    <div className='wrapper'>
        {showData.map(() => (
            <div className='item'>
                是的
            </div>
        ))}
    </div>
  )
}
