import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { anAtom } from './Atoms';

export default function CompB() {
    const [anAtomValue, setAnAtomValue] = useRecoilState(anAtom);
    const handleChange = ({target: {value}}) => {
      setAnAtomValue(value);
    }
  return (
    <div>
      <br />
      <input type="text" value={anAtomValue} onChange={handleChange}/>
    </div>
  )
}
