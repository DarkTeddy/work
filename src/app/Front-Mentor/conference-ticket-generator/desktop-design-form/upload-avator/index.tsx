'use client'
import React from 'react'
import Image from 'next/image'
import './index.css'

export default function index() {
    return (
        <div className='upload-avator-wrapper'>
            <h4>Upload Avatar</h4>
            <div className='upload-avator-content'>
                <div>
                    <Image
                        src={'/conference-ticket-generator-main/assets/images/icon-upload.svg'}
                        alt='Upload Avator'
                        width={20}
                        height={20}
                    />
                </div>
                <h5>Drag and drop or click to upload</h5>
            </div>
            <Image
                src={'/conference-ticket-generator-main/assets/images/icon-info.svg'}
                alt='Upload Avator'
                width={20}
                height={20}
            />
            Upload your photo （JPG or PNG, max size: 500KB）.
        </div>
    )
}
