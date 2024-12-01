import React, { useState } from 'react'

export default function FixedSizeList(props) {
  const {height,width,itemSize,itemCount,children: Child} = props;
  // 记录滚动掉的高度
  const [scrollOffset, setScrollOffset] = useState(0);

  // 外部容器高度
  const containerStyle = {
    position: 'relative',
    width:
  }
  return (
    <div>FixedSizeList</div>
  )
}
