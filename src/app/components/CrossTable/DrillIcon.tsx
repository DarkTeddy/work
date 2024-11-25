import React from 'react';
import Image from 'next/image';
import RightArrowSvg from '/public/rightArrow.svg';

export default function DrillIcon(props: any) {
  const {onClick} = props;
  return (
    <Image
          priority
          src={RightArrowSvg}
          width={20}
          height={20}
          alt="下钻箭头"
          onClick={onClick}
        />
  )
}
