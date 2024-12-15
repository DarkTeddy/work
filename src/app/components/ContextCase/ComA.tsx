import React, { useContext } from 'react'
import { MyContext } from '.'

export default function CompA() {
  const {theme, setTheme} = useContext(MyContext);
  return (
    <div>
      这里是A组件，theme的值是{theme}
      <hr />
    </div>
  )
}
