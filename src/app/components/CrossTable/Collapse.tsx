import React from 'react';
import Image from 'next/image';
import DownArrowSvg from '/public/downArrow.svg';

export default function CollapseIcon(props: any) {
  const {onClick} = props;
  return (
    <Image
          priority
          src={DownArrowSvg}
          width={20}
          height={20}
          alt="收起箭头"
          onClick={onClick}
        />
  )
}
