import React from "react";
import Image from "next/image";
import "./index.css";

export default function index() {
  return (
    <>
      <div
        className="form-bg form-all"
        style={{
          backgroundImage: `url(/conference-ticket-generator-main/assets/images/background-desktop.png)`,
        }}
      ></div>
      <Image
        src={
          "/conference-ticket-generator-main/assets/images/pattern-circle.svg"
        }
        alt="圆圈"
        width={200}
        height={200}
        className="form-bg form-top-left"
      />
      <div
        className="form-bg form-top-right"
        style={{
          backgroundImage: `url(/conference-ticket-generator-main/assets/images/pattern-squiggly-line-top.svg)`,
        }}
      ></div>
      <Image
        src={
          "/conference-ticket-generator-main/assets/images/pattern-circle.svg"
        }
        alt="圆圈"
        width={200}
        height={200}
        className="form-bg form-middle-right"
      />
      <div
        className="form-bg form-bottom-left"
        style={{
          backgroundImage: `url(/conference-ticket-generator-main/assets/images/pattern-squiggly-line-bottom.svg)`,
        }}
      ></div>
      {/* <div className="form-bg form-bottom-right"></div> */}
      <div
        className="form-bg form-all"
        style={{
          backgroundImage: `url(/conference-ticket-generator-main/assets/images/pattern-lines.svg)`,
        }}
      ></div>
    </>
  );
}
