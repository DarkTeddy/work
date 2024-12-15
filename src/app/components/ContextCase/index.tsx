import React, { createContext, useState } from 'react'
import CompB from './ComB';
import CompA from './ComA';

export const MyContext = createContext();

export default function ContextCase() {

    const [theme, setTheme] = useState('light');

  return (
    <MyContext.Provider value={{theme,setTheme}}>
        <CompA></CompA>
        <CompB></CompB>
    </MyContext.Provider>
  )
}
