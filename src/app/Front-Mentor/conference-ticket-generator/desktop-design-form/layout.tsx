import React from 'react'
import Image from 'next/image'
import Background from './background'

const Layout = ({children}: {children: React.ReactNode}) => {
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
  )
}

export default Layout