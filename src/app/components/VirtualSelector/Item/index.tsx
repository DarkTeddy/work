import React from 'react'
import './index.css'

export default function Item(props) {
  const {option} = props
  return (
    <div className='item-container'>
      {option.label}
    </div>
  )
}
