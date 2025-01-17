'use client'
import { Input, InputProps } from 'antd'
import React from 'react'
import './index.css'
import ErrMsg from '../err-msg'

interface InputAreaProps extends InputProps{
  inputTitle: string
  placeHolder: string
  errMsg?: string
}

export default function index({inputTitle,placeHolder,errMsg,...rest}:InputAreaProps) {
  return (
    <div  className='input-area'>
        <h4>{inputTitle}</h4>
        <Input placeholder={placeHolder} {...rest}></Input>
        {errMsg && <ErrMsg errmsg={errMsg}/>}
    </div>
  )
}
