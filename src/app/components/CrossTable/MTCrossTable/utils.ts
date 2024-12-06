import { cloneDeep } from "lodash";

export function generateRandomString(length: number){
    const chars = '1234567890abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for(let i=0; i< length; i++){
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

export const mergeCells = (list: any[], dims: string[] = []) =>{
    // 最内部的值不需要合并单元格
    dims.slice(0, dims.length - 1).forEach((dimKey, order) => {
        let rowSpan = 0;
        for(let i = list.length - 1; i >=0 ; i--){
            const it = list[i];
            rowSpan += 1;
            if(i ===0){
                it.__rowSpans[order] = rowSpan;
                break;
            }
            if(list[i-1][dimKey] !== it[dimKey]){
                it.__rowSpans[order] = rowSpan;
                rowSpan = 0;
            }else{
                it.__rowSpans[order] = 0;
            }
        }
    })
    return cloneDeep(list);
}