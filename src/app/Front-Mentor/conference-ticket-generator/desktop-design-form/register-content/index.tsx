import { Button } from "antd";
import React, { useContext, useState } from "react";
import InputArea from "../input-area";
import UploadAvator from "../upload-avator";
import { userinfoContext, UserInfoContextType } from "../context/userinfo-context";
import { UserInfo } from "../../types";

const index = () => {
  const [avatorErrorMsg, setAvatorErrorMsg] = useState('')
  const [fullNameErrMsg, setFullNameErrMsg] = useState('')
  const [emailErrMsg, setEmailErrMsg] = useState('')
  const [githubErrMsg, setGithubErrMsg] = useState('')

  const {userInfo, setUserInfo} = useContext(userinfoContext) as UserInfoContextType;

  function generateTicket(){
    const {fullName, email, avator, githubUsername} = userInfo;
    // 验证头像合法性 在组件内验证
    // 验证Full Name
    if(!fullName) setFullNameErrMsg('Full name can not be empty.')
    // 验证Email
    const reg = /'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if(!reg.test(email)) setEmailErrMsg('Please enter a valid email address.');
    // 验证Github Username
    const regex = /^@/;
    if(!regex.test(githubUsername)) setGithubErrMsg('Please enter a valid github usernamee.')
    
    if(!avatorErrorMsg && !fullNameErrMsg && !emailErrMsg && !githubErrMsg){
      // 跳转到路由
    }
  }


  return (
    <>
      <h1 style={{ paddingBottom: "2rem" }}>
        Your Journey to Coding Conf 2025 Starts Here!
      </h1>
      <h6>Secure your spot at next year's biggest coding conference.</h6>
      <UploadAvator avatorError={{avatorErrorMsg,setAvatorErrorMsg}} />
      <InputArea
        onChange={(event) => setUserInfo({
          ...userInfo,
          fullName: event.target.value,
        })}
        inputTitle="Full Name"
        placeHolder=""
        value={userInfo?.fullName}
      />
      
      <InputArea
        inputTitle="Email Address"
        placeHolder="example@email.com"
        type="email"
        value={userInfo.email}
        onChange={(event) => setUserInfo({
          ...userInfo,
          email: event.target.value,
        })}
      />
      <InputArea
        inputTitle="Github Username"
        placeHolder="@yourusername"
        value={userInfo.githubUsername}
        onChange={(event) => setUserInfo({
          ...userInfo,
          githubUsername: event.target.value,
        })}
      />
      <Button className="root-content-button" onClick={() => generateTicket()}>
        Generate My Ticket
      </Button>
    </>
  );
};

export default index;
