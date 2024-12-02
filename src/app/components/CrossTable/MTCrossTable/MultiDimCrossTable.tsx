import React from 'react';
import { Table, TableProps } from 'antd';

export interface RecordType extends Record<string, any>{
    // 当前record维度下钻的路径
    _dimsPath: Array<Array<string>>;
    _idsPath: Array<Array<string>>;
    _rowSpans: Array<number | undefined>;
    _expandedStates: Array<boolean | undefined>;
}

interface MultiDimCrossTableProps extends TableProps<RecordType> {}

const MultiDimCrossTable = (props: MultiDimCrossTableProps) => {
    const {...rest} = props ?? {};
    return (
        <Table
            bordered
            scroll={{x : 'max-content'}}
            pagination={false}
            size='small'
            {...rest}
        ></Table>
    )
}

export default MultiDimCrossTable;
