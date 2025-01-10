'use client'
import { Input } from 'antd'
import React from 'react'

interface InputAreaProps{
  inputTitle: string
  placeHolder: string
}

export default function index({inputTitle,placeHolder}:InputAreaProps) {
  return (
    <div>
        <h4>{inputTitle}</h4>
        <Input placeholder={placeHolder}></Input>
    </div>
  )
}
