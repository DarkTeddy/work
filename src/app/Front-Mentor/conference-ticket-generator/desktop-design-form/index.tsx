import React from 'react'
import Image from 'next/image'
import Background from './background'
import UploadAvator from './upload-avator'
import InputArea from './input-area'
import './index.css'
import { Button } from 'antd'

export default function index() {
    return (
        <div id='form-root'>
            <Background />
            <div className='form-root-content'>
                <div className='form-title'><Image src={'/conference-ticket-generator-main/assets/images/logo-mark.svg'}
                    alt={'svg图'}
                    width={40}
                    height={40} />
                Coding Conf</div>
                
                <h1 style={{paddingBottom: '2rem'}}>Your Journey to Coding Conf 2025 Starts Here!</h1>
                <h5>Secure your spot at next year's biggest coding conference.</h5>
                <UploadAvator />
                <InputArea inputTitle='Full Name' placeHolder=''></InputArea>
                <InputArea inputTitle='Email Address' placeHolder='example@email.com'></InputArea>
                <InputArea inputTitle='Github Username' placeHolder='@yourusername'></InputArea>
                <Button>Generate My Ticket</Button>
            </div>
        </div>
    )
}
