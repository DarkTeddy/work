'use client'
import React, { useEffect, useRef, useState } from 'react';
import { virtualSelectorOptions } from '/public/data/data.js';
import { Select } from "antd";
import Item from './Item';
import './index.css'

// 监听list-container的scroll事件，获取滚动位置scrollTop
// · 假定可视区域（list-view）高度固定，称之为screenHeight
// · 假定列表每项高度固定，称之为itemHeight
// · 假定列表数据称之为listData
// · 假定当前滚动位置称之为scrollTop

// 则可推算出：
// · 列表总高度listHeight = listData.length * itemHeight
// · 可显示的列表项数viewCount - Math.ceil(screenHeight/itemHeight)
// · 数据的起始索引startIndex = Math.floor(scrollTop/itemHeight)
// · 数据的结束索引endIndex = startIndex + visibleCount
// · 列表显示数据为viewData = listData.slice(startIndex, endIndex)

// 滚动后，由于渲染区域相对于可视区域已经发生了偏移，此时需要获取一个
// 偏移量startOffset，通过样式控制将渲染区域偏移至可视区域中
// · 偏移量startOffset = scrollTop - (scrollTop % itemSize)

const totalData = new Array(30).fill(0).map((_, index) => ({ value: index, label: `标签${index}` }));

function VirtualSelector() {
  const [dataList, setDataList] = useState(totalData.slice(0, 5));
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const screenHeight = 300; // 可视区域高度
  const itemHeight = 60; // 每项高度
  const viewCount = 7; // 可视范围内显示的元素个数

  const handleContainerScroll = () => {
    const containerDom = containerRef.current!;
    const scrollTop = containerDom.scrollTop;
    const startIndex = Math.floor(scrollTop / itemHeight); // 当前第一个可视元素的索引
    const endIndex = startIndex + viewCount; // 可视范围的最后一个索引

    setDataList(totalData.slice(startIndex, endIndex));

    // 更新 inner 占位 div 的 top 值
    if (innerRef.current) {
      console.log('???', startIndex * itemHeight)
      innerRef.current.style.paddingTop = `${Math.min(startIndex * itemHeight, 1500)}px`;
    }
  };

  useEffect(() => {
    const containerDom = containerRef.current;
    if (containerDom) {
      containerDom.addEventListener('scroll', handleContainerScroll);
      return () => containerDom.removeEventListener('scroll', handleContainerScroll);
    }
  }, []);

  return (
    <div className="viewport">
      <div className="container" ref={containerRef}>
        <div className='inner' ref={innerRef}>
         {dataList.map((item) => (<Item option={item}/>))}
        </div>
        <div className='fill-height'></div>
      </div>
    </div>
  );
}

export default VirtualSelector;