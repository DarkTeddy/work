import { Button } from "antd";
import React, { useContext, useEffect, useState } from "react";
import InputArea from "../input-area";
import UploadAvator from "../upload-avator";
import { userinfoContext, UserInfoContextType } from "../context/userinfo-context";
import { UserInfo } from "../../types";
import { redirect } from "next/navigation";

const index = () => {
  const [avatorErrorMsg, setAvatorErrorMsg] = useState('')
  const [fullNameErrMsg, setFullNameErrMsg] = useState('')
  const [emailErrMsg, setEmailErrMsg] = useState('')
  const [githubErrMsg, setGithubErrMsg] = useState('')
  const [mounted, setMounted] = useState(false)

  const {userInfo, setUserInfo} = useContext(userinfoContext) as UserInfoContextType;

  function generateTicket(){
    console.log('函数执行了吗');
    
    const {fullName, email, avator, githubUsername} = userInfo;
    // 验证头像合法性 在组件内验证
    // 验证Full Name
    setFullNameErrMsg(fullName ? '' : 'Full name can not be empty.')
    // 验证Email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmailErrMsg(emailRegex.test(email) ? '' : 'Please enter a valid email address.')
    // 验证Github Username
    const regex = /^@/;
    setGithubErrMsg(regex.test(githubUsername) ? '' : 'Please enter a valid github usernamee.')

    console.log('if前')
  }

  useEffect(() => {
    if(!mounted){
      setMounted(true)
      return
    }
    //
    if(!avatorErrorMsg && !fullNameErrMsg && !emailErrMsg && !githubErrMsg){
      console.log(`${avatorErrorMsg}, avatorErrorMsg`, 'if里面', avatorErrorMsg, fullNameErrMsg, emailErrMsg,githubErrMsg );
      
      // 跳转到路由
      redirect('/Front-Mentor/conference-ticket-generator/desktop-design-form/test')
    }
  },[emailErrMsg,githubErrMsg,avatorErrorMsg,fullNameErrMsg])


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
        errMsg={fullNameErrMsg}
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
        errMsg={emailErrMsg}
      />
      <InputArea
        inputTitle="Github Username"
        placeHolder="@yourusername"
        value={userInfo.githubUsername}
        errMsg={githubErrMsg}
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
