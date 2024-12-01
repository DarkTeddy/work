'use client'
import React from 'react'
import { atom, RecoilRoot, selector, useRecoilState, useRecoilValue } from 'recoil'
import { todoListState } from './store/Atoms';
import TodoItemCreator from './TodoItemCreator';
import TodoItem from './TodoItem';

export default function RecoilCase(){
  const todoList = useRecoilValue(todoListState);
  return (
    <>
      <TodoItemCreator />

      {todoList.map(todoItem => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}      
    </>
  );
}