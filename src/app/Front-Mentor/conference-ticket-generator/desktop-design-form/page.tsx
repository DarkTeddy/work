'use client'
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
      
        
        <>
                <RegisterContent />

        </>
  );
}
