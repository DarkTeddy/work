'use client'
import React, { useContext, useState } from "react";
import RegisterContent from "./register-content";
import "./index.css";
import { UserInfo } from "../types";
import { userinfoContext, UserInfoContextType } from "./context/userinfo-context";
import TicketContent from "./ticket-content/page";

function hasEmpty(userInfo: UserInfo){

  for(const p in userInfo){
    console.log('userInfo',p, userInfo[p as keyof UserInfo]);
    if(!userInfo[p as keyof UserInfo]) return true;
  }
  return false;
}
export default function index() {
  const {userInfo, setUserInfo} = useContext(userinfoContext) as UserInfoContextType;
  const [completed,setCompleted] = useState(true);

  return (
      
        
        <>
        {!completed ? <RegisterContent setFinish={setCompleted}/> : <TicketContent />}
        </>
  );
}
