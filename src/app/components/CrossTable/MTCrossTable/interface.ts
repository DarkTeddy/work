import type { BizTableAction } from './useColumns';

export interface DimOption{
    key: string,
    dimKey: string,
    keys: Array<string>,
    value: string,
    label: string,
}

export interface QueryOptions{
    // 下钻的是第几个维度
    order: number;
    // 下钻维度
    drillDim: string;
    //参与到表格下钻维度的配置
    drillDimOptions: Array<{ value: string, label: string, dimKey?: string, keys: Array<string>}>;
    // 取消信号
    signal?: AbortSignal;
    record: {
        // 下钻信息
        dimsPath: Array<Array<string>>;
        // 下钻维值路径组成的id数组，可以与维值信息共用
        idsPath: Array<Array<string>>;
        // 下钻时候会有其他属性
        [key: string]: any;
    }
}