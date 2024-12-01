import React from 'react'
import { todoListState } from './store/Atoms';
import { useRecoilState } from 'recoil';

export default function TodiListFilters() {
    const [filter, setFilter] = useRecoilState(todoListState);

    const updateFilter = ({target: {value}}) => {
        setFilter(value);
    }
  return (
    <>
        Filter:
        <select value={filter} onChange={updateFilter}>
            <option value="Show All">All</option>
            <option value="Show Completed">Completed</option>
            <option value="Show Uncompleted">Uncompleted</option>
        </select>
    </>
  )
}
