import React from "react";
import Image from "next/image";
import './index.css'
import { handleClick } from "../../../utils";

interface LoadedTypes{
    imgURL: string
    reset: Function
}

const index: React.FC<LoadedTypes> = ({imgURL, reset}) => {

  function handleChangeImg(){
    // 改变图片
    handleClick();
  }
    return (
        <>
          <div className="upload-img-container">
            <img src={imgURL} alt="" />
          </div>
          <div className="uploaded-buttons">
            <h6 className="uploaded-button" onClick={() => reset()}>Remove image</h6>
            <div style={{width: '0.7rem'}}></div>
            <h6 className="uploaded-button" onClick={() => handleChangeImg()}>Change image</h6>
          </div>
        </>
      );
}
export default index;
