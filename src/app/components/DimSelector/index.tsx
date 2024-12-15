import { Button } from 'antd';
import React from 'react';
import './index.css'

const dims = [
    '维度1',
    'asc',
    '很长的维度',
    '又是一个不定长的维度',
    '这似乎不是一个新的问题',
    'h',
    '909090',
    '维度1',
    'asc',
    '很长的维度',
    '又是一个不定长的维度',
    '这似乎不是一个新的问题',
    'h',
    '909090'
]

function handleClick(direction: string){
  // 获取当前的最右边
  const containerDom: HTMLElement | null = document.getElementsByClassName('middle')[0] as HTMLElement;
  const containerWidth = containerDom.clientWidth;
  console.log('containerWidth', containerWidth, containerDom.offsetWidth);
  
  
  if(containerDom){
    const buttons = containerDom.getElementsByTagName('button');
    
    // 找到处于右边边界的元素
    let nodeAtRightBound = null;

    for (let index = 0; index < buttons.length; index++) {
      const button = buttons[index];

      // 判断当前元素的右边界是否在可视区域内
      if(button.getBoundingClientRect().right < containerDom.getBoundingClientRect().right) continue;

      // 接下来判断当前元素的左边界是否在可视区域内
      if(button.getBoundingClientRect().left < containerDom.getBoundingClientRect().right){
        nodeAtRightBound = button;
        console.log(index,button.innerText);
        break;
      }
    }

    // 找到边界元素后，移动至该边界元素的最右端
    if(nodeAtRightBound){
      console.log(nodeAtRightBound.getBoundingClientRect().right,containerDom.getBoundingClientRect().right);
      console.log('偏移量', nodeAtRightBound.getBoundingClientRect().right , containerDom.getBoundingClientRect().right);
      
      
      containerDom.scrollBy(nodeAtRightBound.getBoundingClientRect().right - containerDom.getBoundingClientRect().right + 1,0)
    }
  }
}
export default function DimSelector() {
  return (
    <div className='dim-container'>
        <div className='left' onClick={() => handleClick('left')}>左边</div>
        <div className='middle'>
            {dims.map(dim => (
                <Button>{dim}</Button>
            ))}
        </div>
        <div className='right' onClick={() => handleClick('right')}>右边</div>
    </div>
  )
}
