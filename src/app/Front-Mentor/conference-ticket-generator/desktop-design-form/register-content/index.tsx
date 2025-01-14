import { Button } from "antd";
import React, { useState } from "react";
import InputArea from "../input-area";
import UploadAvator from "../upload-avator";

const index = () => {
  const [fullName, setFullName] = useState<undefined | string>();
  const [email, setEmail] = useState<undefined | string>();
  const [avator, setAvator] = useState<undefined | string>();
  const [githubUsername, setGithubUsername] = useState<undefined | string>();

  function fullNameChange(event: React.ChangeEvent<HTMLInputElement>){
    setFullName(event.target.value);
  }

  function emailChange(event: React.ChangeEvent<HTMLInputElement>){
    setEmail(event.target.value)
  }

  function githubChange(event: React.ChangeEvent<HTMLInputElement>){
    setGithubUsername(event.target.value)
  }
  function generateTicket() {
    // 验证当前数据的合法性
  }
  return (
    <>
      <h1 style={{ paddingBottom: "2rem" }}>
        Your Journey to Coding Conf 2025 Starts Here!
      </h1>
      <h6>Secure your spot at next year's biggest coding conference.</h6>
      <UploadAvator />
      <InputArea
        onChange={(event) => fullNameChange(event)}
        inputTitle="Full Name"
        placeHolder=""
        value={fullName}
      />
      
      <InputArea
        inputTitle="Email Address"
        placeHolder="example@email.com"
        type="email"
        value={email}
        onChange={(event) => emailChange(event)}
      />
      <InputArea
        inputTitle="Github Username"
        placeHolder="@yourusername"
        value={githubUsername}
        onChange={(event) => githubChange(event)}
      />
      <Button className="root-content-button" onClick={() => generateTicket()}>
        Generate My Ticket
      </Button>
    </>
  );
};

export default index;
