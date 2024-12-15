import React, { useContext } from 'react'
import { MyContext } from '.'

export default function CompB() {
  const {theme, setTheme} = useContext(MyContext);
  return (
    <div>
      
      这里是ComB
      <h2>
      这里是ComB我将要在这里修改theme的值，当前的值是{theme};
      </h2>
      <button onClick={() => setTheme(Math.random().toFixed(5))}>我草你的</button>
    </div>
  )
}
