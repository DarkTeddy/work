import React from 'react'
import { UserInfo } from '../../types'
import Image from 'next/image'
import PatternTicket from 'public/conference-ticket-generator-main/assets/images/pattern-ticket.svg'

interface CardProps extends UserInfo{}

const Card: React.FC<CardProps> = (props) => {
    const {fullName,avator,githubUsername} = props;
  return (
    // <PatternTicket />
    <Image 
    src={'/conference-ticket-generator-main/assets/images/pattern-ticket.svg'}
    width={200}
    height={400}
    alt='svg'
    />
  )
}

export default Card