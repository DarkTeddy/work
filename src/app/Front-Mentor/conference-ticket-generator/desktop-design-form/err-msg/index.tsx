import React from 'react'
import './index.css'
import IconInfo from 'public/conference-ticket-generator-main/assets/images/icon-info.svg'

type ErrMsgType = {
    errmsg: string
}

const ErrMsg: React.FC<ErrMsgType> = ({errmsg}) => {
  return (
    <div className='err-msg'>
        <IconInfo />
        <h6>{errmsg}</h6>
        {/* <span>{errmsg}</span> */}
    </div>
  )
}

export default ErrMsg