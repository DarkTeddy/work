'use client'
import React, { useEffect, useState } from 'react';
import { Space, Switch, Table } from 'antd';
import {cloneDeep} from 'lodash';
import DrillIcon from './DrillIcon';
import CollapseIcon from './Collapse';
import { calIndentation, collapseCount } from './tools';

const dims = ['province', 'city', 'country'];
const generateUniqueId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
const getDeleteCount = (arr: [], index: number, name: string) => {
  if(index > arr.length - 1) return 0;

}

const data = [
  // 省级数据
  { id: generateUniqueId(), expanded: false, dim: 'province', cityName: '山西省', population: '37M', GDP: '1.8T', parentcityName: null },
  { id: generateUniqueId(), expanded: false,dim: 'province', cityName: '河北省', population: '75M', GDP: '3.7T', parentcityName: null },
  { id: generateUniqueId(), expanded: false,dim: 'province', cityName: '山东省', population: '100M', GDP: '7.2T', parentcityName: null },
  { id: generateUniqueId(), expanded: false,dim: 'province', cityName: '江苏省', population: '80M', GDP: '9.2T', parentcityName: null },
  { id: generateUniqueId(), expanded: false,dim: 'province', cityName: '浙江省', population: '58M', GDP: '6.5T', parentcityName: null },

  // 市级数据
  { id: generateUniqueId(), expanded: false,dim: 'city', cityName: '太原市', population: '4.2M', GDP: '400B', parentcityName: '山西省' },
  { id: generateUniqueId(), expanded: false,dim: 'city', cityName: '大同市', population: '3.4M', GDP: '350B', parentcityName: '山西省' },
  { id: generateUniqueId(), expanded: false,dim: 'city', cityName: '石家庄市', population: '10.4M', GDP: '1.2T', parentcityName: '河北省' },
  { id: generateUniqueId(), expanded: false,dim: 'city', cityName: '唐山市', population: '7.9M', GDP: '1T', parentcityName: '河北省' },

  // 县级数据
  { id: generateUniqueId(), expanded: false,dim: 'country', cityName: '杏花岭区', population: '500K', GDP: '20B', parentcityName: '太原市' },
  { id: generateUniqueId(), expanded: false,dim: 'country', cityName: '迎泽区', population: '600K', GDP: '25B', parentcityName: '太原市' },
  { id: generateUniqueId(), expanded: false,dim: 'country', cityName: '城区', population: '550K', GDP: '23B', parentcityName: '大同市' },
  { id: generateUniqueId(), expanded: false,dim: 'country', cityName: '矿区', population: '450K', GDP: '19B', parentcityName: '大同市' }
];

const getDataByDim = (dim: string) => {
  const result = data.filter(item => item.dim === dim);
  
  return new Promise((resolve)=>{
    setTimeout(() => {
      resolve(result);
    }, 100);
  })
}

const getDataByDimValue = (dimValue: string) => {
  const result = data.filter(item => item.parentcityName === dimValue);

  return new Promise((resolve) =>{
    setTimeout(() => {
      resolve(result);
    }, 500);
  })
}



export default function MultiCrossTable() {

  const [dataSource, setDataSource] = useState([]);

  const handleDrillClick = (record) => {
    // 发起一个异步请求
    // 找到原数据中当前record的位置
    const prevRecordIndex = dataSource.findIndex(item => item.id === record.id);
    // 找到所有
    if(!record.expanded){
      // 如果当前记录没有展开
      getDataByDimValue(record.cityName).then((res) => {
        
        setDataSource((prev: any[]) => {
          const temp: any[] = cloneDeep(prev);
          temp[prevRecordIndex].expanded = true;
          temp.splice(prevRecordIndex+1,0,...res);
          return temp;
        });
      });
    }else{
      console.log('没有触发点击函数吗？', prevRecordIndex);
      
      // 如果已经展开了，就要收回
      setDataSource((prev: any[]) => {
        const temp: any[] = cloneDeep(prev);
        temp[prevRecordIndex].expanded = false;
        // 需要递归删掉所有子元素
        const deleteCount = collapseCount(dataSource, prevRecordIndex, dims);
        temp.splice(prevRecordIndex+1, deleteCount);
        
        return temp;
      });
    }
  }

  const columns = [
    {
      title: '城市',
      dataIndex: 'cityName',
      render: (text, record, index) => {
        
        const showIcon = !dims[dims.length - 1] === record.dim;
        const expanded = record.expanded;
        return (
          <span style={{paddingLeft: `${calIndentation(record.dim, dims)}px`}}>{showIcon ? '' : (expanded ? <CollapseIcon onClick={() => handleDrillClick(record)} /> :<DrillIcon onClick={() => handleDrillClick(record)} />)}{text}</span>
        )
      },
    },
    {
      title: '人口',
      dataIndex: 'population',
    },
    {
      title: 'GDP',
      dataIndex: 'GDP',
    }
  ]

  useEffect(() => {
    // 页面初始化先获取初始数据
    getDataByDim('province').then(res=>{
      setDataSource(res);
    })
  },[]);
  // 先考虑单个下钻维度
  return (
    <Table columns={columns} dataSource={dataSource}></Table>
  )
}
