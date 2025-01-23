import React, { useContext } from 'react'
import { UserInfo } from '../../types';
import Card from '../card';
import { userinfoContext, UserInfoContextType } from '../context/userinfo-context';
import './index.css'
const TicketContent:React.FC = () => {
  
  const {userInfo, setUserInfo} = useContext(userinfoContext) as UserInfoContextType;
  const {fullName, email, } = userInfo;
  return (
    <>
      <h1 style={{ paddingBottom: "2rem" }}>
        Congrats, <span className='linear'>{fullName}!</span> <br />
        Your ticket is ready.
      </h1>
      <h6>We've emailed your ticket to <span style={{color: '#B95058'}}>{email}</span> and will send updates to the run up to the event.</h6>
      <Card {...userInfo}></Card>
    </>
  )
}

export default TicketContent