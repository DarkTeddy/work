import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil';
import { todoListState } from './store/Atoms';

let id = 0;
function getId(){
  return id++;
}

export default function TodoItemCreator() {
  const [inputValue, setInputValue] = useState('');
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    setTodoList(oldTodoList => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
  }

  const handleOnChange = ({target: {value}}) => {
    setInputValue(value);
  }
  
  useState
  return (
    <div>
      <input type="text" value={inputValue} onChange={handleOnChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
}
