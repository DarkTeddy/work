import React from 'react'
import { UserInfo } from '../../types';
import Card from '../card';

const TicketContent:React.FC<UserInfo> = (props) => {
    const {fullName,email,githubUsername, avator} = props;
  return (
    <>
      <h1 style={{ paddingBottom: "2rem" }}>
        Congrats, {fullName}! <br />
        Your ticket is ready.
      </h1>
      <h6>We've emailed your ticket to {email} and will send updates to the run up to the event.</h6>
      <Card {...props}></Card>
    </>
  )
}

export default TicketContent