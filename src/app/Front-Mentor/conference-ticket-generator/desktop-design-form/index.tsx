import React, { useState } from "react";
import Image from "next/image";
import Background from "./background";
import RegisterContent from './register-content'
import "./index.css";
import { UserInfo } from "../types";
import TicketContent from "./ticket-content";

export default function index() {
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>({
    avator: 'a',
    fullName: 'lgq',
    email: '395755698@qq.com',
    githubUsername: '@github',
  });

  return (
    <div id="form-root">
      <Background />
      <div className="form-root-content">
      <div className="form-title">
        <Image
          src={"/conference-ticket-generator-main/assets/images/logo-mark.svg"}
          alt={"svg图"}
          width={40}
          height={40}
        />
        Coding Conf
      </div>
      {/* {userInfo ? <TicketContent {...userInfo}/>  : <RegisterContent />} */}
      {/* <TicketContent /> */}
      <RegisterContent />
      </div>
    </div>
  );
}
