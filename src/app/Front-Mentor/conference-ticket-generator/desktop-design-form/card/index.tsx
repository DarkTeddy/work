import React from "react";
import { UserInfo } from "../../types";
import Image from "next/image";
import PatternTicket from "public/conference-ticket-generator-main/assets/images/pattern-ticket.svg";
import FullLogo from "public/conference-ticket-generator-main/assets/images/logo-full.svg";
import "./index.css";

interface CardProps extends UserInfo {}

const Card: React.FC<CardProps> = (props) => {
  const { fullName, avator, githubUsername } = props;
  return (
    // <PatternTicket />
    // <Image
    // src={'/conference-ticket-generator-main/assets/images/pattern-ticket.svg'}
    // width={200}
    // height={400}
    // alt='svg'
    // />
    <>
      <PatternTicket></PatternTicket>
      <div className="pt">
        {/* <Image
          src={
            "/conference-ticket-generator-main/assets/images/pattern-ticket.svg"
          }
          fill
          alt="svg"
        /> */}
        <PatternTicket className='pt-bg-svg'></PatternTicket>
        <div className="pt-left">
          <div className="pt-left-top">
            <FullLogo />
            <h6>Jan 31, 2025 / Austin, TX</h6>
          </div>
          <div className="pt-left-bottom">
            <div className="upload-img-container">
              <img
                src="/conference-ticket-generator-main/assets/images/170kb.jpg"
                alt=""
              />
            </div>
            <div className="pt-nameplate">
              <h5 style={{marginBottom: '0.6rem'}}>Jonatan Kristof</h5>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Image
                  width={20}
                  height={20}
                  src={
                    "/conference-ticket-generator-main/assets/images/icon-github.svg"
                  }
                  alt=""
                />
                <h6>@JonatanKristof0101</h6>a
              </div>
            </div>
          </div>
        </div>
        <div className="pt-right">
          <span>#01609</span>
        </div>
      </div>
    </>
  );
};

export default Card;
