'use client'
import { Input, InputProps } from 'antd'
import React from 'react'
import './index.css'

interface InputAreaProps extends InputProps{
  inputTitle: string
  placeHolder: string
}

export default function index({inputTitle,placeHolder,...rest}:InputAreaProps) {
  return (
    <div  className='input-area'>
        <h4>{inputTitle}</h4>
        <Input placeholder={placeHolder} {...rest}></Input>
    </div>
  )
}
