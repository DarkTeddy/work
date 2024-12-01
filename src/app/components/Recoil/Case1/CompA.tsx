import React from 'react'
import { selector, useRecoilValue } from 'recoil'
import { anAtom } from './Atoms';
import { sliceAnAtom } from './Selector';

export default function CompA() {
    const anAtomValue = useRecoilValue(anAtom);
    const sliceAtomValue = useRecoilValue(sliceAnAtom)

    
  return (
    <div>当前的anAtomValue： {anAtomValue}
    <br />
    当前过滤后的sliceAnAtom： {sliceAtomValue}
    </div>
  )
}
