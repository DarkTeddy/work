// 判断是否为最后一次能
export function isLastDim(dimValue: string, dims: string[]): boolean{
    return dimValue === dims[dims.length - 1];
}

// 计算缩进距离
export function calIndentation(dimValue: string, dims: string[]):number{
    const index = dims.findIndex(item => item === dimValue);    
    return index === -1 ? 0 : 14 * index;
}

// 计算收起条数
export function collapseCount(dataSource: any[], index: number, dims: string[]): number{
    
    let count = 0;
    // 自身
    const record = dataSource[index];
    if(!record) return 0;
    const {dim: curDim} = record;

    // 子数据应该的维度
    const shouldNextDim = dims[dims.findIndex(item => item ===curDim) + 1];

    // 下一条数据
    let nextIndex = index+1;
    let nextRecord = dataSource[nextIndex];
    if(!nextRecord) return count;
    const {dim: nextRecordDim} = nextRecord;
    //if(nextRecordDim !== shouldNextDim) return count;

    

    // 下一条数据有N种情况
    // 1. 跟当前数据的维度相同，直接返回0；
    // 2. 不存在下一条数据，直接返回0；
    // 3. 下一条数据是子数据
    while(nextRecord){
        if(record.cityName === '河北省')console.log('传入的index', index, record, nextIndex, nextRecord, nextRecord.dim, shouldNextDim, count);
        if(!nextRecord || nextRecord.dim !== shouldNextDim) return count;

        // 否则的话，就是附属子级
        // count++;
        if(record.cityName === '河北省') console.log('传入的count', count);
        
        const tempRes = collapseCount(dataSource, nextIndex, dims) + 1;
        count += tempRes;
        
        nextIndex += tempRes;
        nextRecord = dataSource[nextIndex];
    };
    
    return count;
}