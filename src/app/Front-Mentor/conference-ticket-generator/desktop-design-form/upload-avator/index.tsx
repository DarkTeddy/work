"use client";
import React, { useContext, useState } from "react";
import "./index.css";
import {
  upload_error_filetype,
  upload_error_overload,
  upload_notion,
} from "../const";
import LoadWaiting from "./load-waiting";
import Loaded from "./loaded";
import { Spin } from "antd";
import IconInfo from 'public/conference-ticket-generator-main/assets/images/icon-info.svg'
import { userinfoContext, UserInfoContextType } from "../context/userinfo-context";

type AvatorErrorType = {
  avatorErrorMsg: string,
  setAvatorErrorMsg: React.Dispatch<React.SetStateAction<string>>;
}
export default function index({avatorError} : {avatorError: AvatorErrorType}) {
  const {userInfo, setUserInfo} = useContext(userinfoContext) as UserInfoContextType ;
  // const [uploadedImgURL, setUploadedImgURL] = useState<null | string>(null);
  const [loading, setLoading] = useState(false)
  
  const {avatorErrorMsg: errMsg, setAvatorErrorMsg: setErrMsg} = avatorError;

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.[0]) {
      setLoading(true)
      const old = Date.now()
      const file = event.target.files[0];
      
      const fileExt = file.name.split(".").pop()?.toLowerCase();
      new Promise((resolve, reject) => {
        // 如果不是PNG或者JPS文件，弹出类型错误
        if (!fileExt || (fileExt !== "png" && fileExt !== "jpg")) {
          throw new Error(upload_error_filetype);
        }
        if (file.size > 512000) {
          throw new Error(upload_error_overload);
        }
        const fileReader = new FileReader();

        fileReader.onload = () => {
          const now = Date.now()
          if(now - old >= 10000){
            resolve(fileReader.result);
          }else{
            setTimeout(() => resolve(fileReader.result),10000-now+old)
          }
        };

        fileReader.onerror = (error) => {
          reject(error);
        };

        // 开始读文件
        fileReader.readAsDataURL(file);
      })
        .then((res) => {
          const result = res as string;
          // setUploadedImgURL(result);
          setUserInfo({
            ...userInfo,
            avator: result,
          })
          setErrMsg('');
        })
        .catch((error: Error) => {
          console.log("error", error, typeof error);
          // 将提示信息改成报的错
          setErrMsg(error.message);
        }).finally(() => setLoading(false));
    }
    // 第二步：拿到文件内容后替换icon-upload.svg
  }
  return (
    <div className="upload-avator-wrapper">
      <input
        type="file"
        id="file-input"
        style={{ display: "none" }}
        onChange={(event) => handleInputChange(event)}
      />
      <h4>Upload Avatar</h4>
      <div style={{lineHeight: loading ? '9rem' : 'normal'}} className="upload-avator-content">
        {loading ? <Spin /> : (userInfo.avator ? <Loaded imgURL={userInfo.avator} reset={() => setUserInfo({
          ...userInfo,
          avator:'',
        })}/> : (<LoadWaiting />))}
      </div>
      <div className={`upload-avator-notion ${errMsg ?'svg-error' : '' }`} style={{color: errMsg ? '#7F5069' : 'inherit'}}>
        {/* <img src="/conference-ticket-generator-main/assets/images/icon-info.svg" alt="" /> */}
        <IconInfo />
        <h6>{errMsg ? errMsg : upload_notion}</h6>
      </div>
    </div>
  );
}
