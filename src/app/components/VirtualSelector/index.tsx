import React from 'react';
import {virtualSelectorOptions} from '/public/data/data.js';
import { Select } from "antd";
export default function VirtualSelector() {
    console.log(virtualSelectorOptions);
  return (
    <div>
        <Select
            options = {virtualSelectorOptions}
            // virtual = {false}
        />
    </div>
  )
}
