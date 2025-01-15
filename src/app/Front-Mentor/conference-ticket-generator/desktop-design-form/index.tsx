import React, { createContext, useContext, useState } from "react";
import Image from "next/image";
import Background from "./background";
import RegisterContent from "./register-content";
import "./index.css";
import { UserInfo } from "../types";
import { userinfoContext } from "./context/userinfo-context";

export default function index() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    avator: "",
    fullName: "",
    email: "",
    githubUsername: "",
  });

  return (
    <div id="form-root">
      <Background />
      <div className="form-root-content">
        <div className="form-title">
          <Image
            src={
              "/conference-ticket-generator-main/assets/images/logo-mark.svg"
            }
            alt={"svg图"}
            width={40}
            height={40}
          />
          Coding Conf
        </div>
        {/* {userInfo ? <TicketContent {...userInfo}/>  : <RegisterContent />} */}
        {/* <TicketContent /> */}
        <userinfoContext.Provider value={{userInfo, setUserInfo}}>
          <RegisterContent />
        </userinfoContext.Provider>
      </div>
    </div>
  );
}
