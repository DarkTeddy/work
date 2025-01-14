import React from "react";
import Image from "next/image";
import { icon_upload } from "../../const";
import { handleClick } from "../../../utils";


export default function index() {
  
  return (
    <>
      <div className="upload-img-container" onClick={() => handleClick()}>
        <Image src={icon_upload} alt="Upload Avator" width={20} height={20} />
      </div>
      <h5>Drag and drop or click to upload</h5>
    </>
  );
}
