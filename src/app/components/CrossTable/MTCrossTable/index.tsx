import { useEffect, useMemo, useRef, useState } from "react";
import { cloneDeep, flattenDeep, groupBy, identity, isEmpty, isEqual, last, merge, orderBy, uniqBy } from 'lodash';
import { Col, Dropdown, notification, Row, Tooltip } from "antd";
import Icon, { SwapOutlined } from "@ant-design/icons";
import { mergeCells } from "./utils";
import { DimOption } from "./interface";

const snapShot = new SnapShot<Array<any>, {
    positionId: any;
    order: number;
    status: boolean;
    deleteCount: number;
    dataList: Array<any>;
}>({ store: {} });

function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 默认展开第一层
let $expandTriggers: HTMLElement[] = [];
async function tableAutoExpandFirstLevel(loadingRef: { current: boolean }) {
    // 如果是业务线，总部人员，要求默认展开一层
    const $tBody: HTMLElement | null = document.querySelector(
        '.dim-comparison_table-wrap .ant-table-container .ant-table-tbody'
    );
    if (!$tBody) return;
    $expandTriggers = Array.from($tBody?.querySelectorAll('.ant-table-row td:nth-child(1) .roo-icon-chevron-right'));

    while ($expandTriggers.length > 0) {
        if (loadingRef.current) {
            await wait(20);
        } else {
            const $dom = $expandTriggers.shift();
            const ev = new Event('click', { bubbles: true, cancelable: false });

            if ($dom) {
                $dom.dispatchEvent(ev);
            }
        }
    }
}

const BizDrillTable: CardBizComponent<BizCardDrillTableProps> = ({
    // 卡片钩子
    effects,
    useConfigQuery,
    module,
    date,
    actions,
    // 是否默认第一层展开
    isFirstColumnDefaultExpanded = false,
}) => {
    const { cardMeta, moduleName } = module;

    const casDims = cardMeta.dimPanel.getSumPathGroupByModuleNames(moduleName);

    const { useOnSubmit } = effects;

    // 全局filters
    const [globalFilters, setGlobalFilters] = useState<any>({});
    // indexes从全局取
    const [selectedIndexes, setSelectedIndexes] = useState<string[]>([]);

    // 日期相关
    const [dateType, setDateType] = useState<EnumDateType>(date.main.dateType);
    // 环比
    const [checkedRateTypes, setCheckedRateTypes] = useState<any[]>([]);

    useOnSubmit(FilterInfo => {
        const { date, filtersInfo } = FilterInfo;
        const { rateTypes: _rateTypes, main: dateValue } = date;

        //全局Filters
        const { filters: _globalFilters, indexes: _indexes } = filtersInfo.formattedFilters;
        setGlobalFilters(cloneDeep(_globalFilters));
        setSelectedIndexes(cloneDeep(_indexes));
        setCheckedRateTypes(cloneDeep(_rateTypes));
        setDateType(dateValue.dateType);
    });

    const initDimOptions =
        casDims?.map(item => {
            const casDetail = cardMeta.dimSumPath.getAllDimsBySumPathId(item.dimList[0].sumPathId);
            return {
                key: casDetail[0].dimNameEn,
                dimKey: `${casDetail[0].dimNameEn}_key`,
                value: casDetail[0].dimNameEn,
                label: item.groupName,
                keys: casDetail.map(it => it.dimNameEn),
            }
        })

    //维度选项
    const [majorDimOptions, setMajorDimOptions] = useState(initDimOptions);

    //当前选择维度
    const [tableMajorDim, setTableMajorDim] = useState<DimOption>(majorDimOptions?.[0]);
    const [tableMinorDim, setTableMinorDim] = useState<DimOption>(all);

    // 数据源
    const [dataSource, setDataSource] = useState<any[]>([]);

    // 标题
    const [dataTitle, setDataTitle] = useState<Array<any>>([]);
    const dataTitleRef = useRef<any[]>([]);

    // 排序
    const [sortInfo, setSortInfo] = useState<SortInfoProps | undefined>();

    // 用ref维护本地状态
    const options = useRef<QueryOptions>({
        record: {
            dimPath: [],
            idsPath: [],
        },
        drillDimOptions: [tableMajorDim, tableMinorDim],
        drillDim: tableMajorDim.keys[0],
        order: 0,
        signal: undefined,
    })
    const queryControlRef = useRef<AbortController[]>([]);
    const isLodingRef = useRef<boolean>(false);

    const updateDataTitle = (dataTitle: any[]) => {
        const keys: string[] = [];
        if (tableMajorDim) {
            keys.push(...tableMajorDim.keys);
        }
        if (tableMinorDim && tableMinorDim.value !== all.value) {
            keys.push(...tableMinorDim.keys);
        }
        dataTitleRef.current = orderBy(
            uniqBy(dataTitleRef.current.concat(dataTitle), 'key').filter(
                it => !['is_dj_offline', 'is_bj_realtime'].includes(it.key),
            ),
            [
                it => {
                    if (it.key === 'dt') return -1e3;
                    const priority = it.columnType === 1 ? -1 : 1;
                    if (it.columnType === 1) {
                        for (let i = 0; i < keys.length; i++) {
                            if (keys[i] === it.key) {
                                return priority * 1e2 + 0.5 * i;
                            }
                        }
                    } else {
                        return priority;
                    }
                    return priority * 1e2;
                }
            ],
            ['asc'],
        )
    }

    // expand不应该在queryData里
    const queryData = (params: any, query: Function) => {
        return () => {
            const { record, order, signal, drillDimOptions, drillDim } = options.current;
            const { dimsPath, idsPath } = record;

            params.filters = cloneDeep(globalFilters);
            params.indexes = selectedIndexes;

            // 拼接本地参数，每一层的id和name都要放进去
            const otherDims = flattenDeep([dimsPath, drillDim].filter(identity));
            params.dims = dimNameComplete(otherDims);
            params.dims.push(dateType);

            // 添加filters
            const localFilterParams = flattenDeep(record.dimsPath).reduce<Record<string, string>>((acc, dim) => {
                if (record[`${dim}_id`] && !['全部'].includes(record[`${dim}_id`])) {
                    return {
                        ...acc,
                        [`${dim}_id`]: record[`${dim}_id`],
                    }
                }
                return acc;
            }, {});

            params.filters = merge(params.filters, localFilterParams);

            const nextDimsPath = cloneDeep(dimsPath);

            if (!nextDimsPath[order]) {
                nextDimsPath[order] = [];
            }
            nextDimsPath[order].push(drillDim);

            return query(params, {
                protocolType: ProtocolType.OneService,
                signal,
            }).then(({ dataList, dataTitle }: { dataList: any[], dataTitle: any[] }) => {
                updateDataTitle(dataTitle);
                return {
                    dataTitle,
                    dataList: dataList.map((it: any) => {
                        const nextIdsPath = cloneDeep(idsPath);
                        const result = {
                            ...it,
                            _dimsPath: nextDimsPath,
                            _expandedStates: [false, false],
                            _rowSpans: [],
                        };
                        nextIdsPath[order].push(it[`${drillDim}_id`]);
                        drillDimOptions.forEach((option, i) => {
                            const dimKey = option.dimKey;
                            if (!dimKey) {
                                return;
                            }
                            const lastDimKey = `${last(nextDimsPath[i])}_id`;
                            if (lastDimKey && dimKey !== 'all') {
                                result[dimKey] = it[lastDimKey];
                            } else {
                                result[dimKey] = generateRandomString(6);
                                if (isEmpty(nextIdsPath[i])) {
                                    nextIdsPath[i] = [result[dimKey]];
                                }
                            }
                        })
                        result.___idsPath = nextIdsPath;
                        return result;
                    })
                }
            })
        }
    }

    const { run } = useConfigQuery(queryData, { manual: true })

    const handleExpand = (record: RecordType, order: number = 0) => {
        if (!tableMajorDim || !tableMinorDim) {
            return;
        }
        const drillDimOptions = [tableMajorDim, tableMinorDim];
        const dimKey = drillDimOptions[order].dimKey;
        if (!dimKey) {
            return;
        }

        const dimsList = drillDimOptions[order].keys;
        const dimPath = record._dimsPath[order];
        const currentDim = last(dimPath);
        const dimOrder = currentDim ? dimsList.indexOf(currentDim) : -1;
        const drillDim = dimsList[dimOrder + 1];

        const position = dataSource.findIndex(it => isEqual(it.__idsPath, record.___idsPath));
        let modifyPosition = position + 1;
        if (order < drillDimOptions.length - 1) {
            for (let i = modifyPosition; i < setDataSource.length; i++) {
                if (!isEqual(record.___idsPath[order], dataSource[i].___idsPath[order])) {
                    break;
                }
                modifyPosition += 1;
            }
        }

        const expanded = record.__expandedStates[order];

        if (expanded) {
            // fold
            let deleteCount = 0;
            const len = record.__idsPath[order].length;
            for (let i = modifyPosition; i < dataSource.length; i++) {
                if(order === 0){
                    if(!isEqual(record.__idsPath[order],dataSource[i].___idsPath[order].slice(0,len))){
                        break;
                    }
                }else if(
                    !isEqual(record.__idsPath[order],dataSource[i].___idsPath[order].slice(0,len)) ||
                    !isEqual(record.__idsPath[0], dataSource[i].__idsPath[0])){
                    break;
                }
                    
                

                deleteCount += 1;
            }
            const dataSourceRecord = dataSource.find(item => isEqual(item, record));
            dataSourceRecord.__expandedStates[order] = false;
            // toJS方法是将一个元素递归的转换成js对象（可能来自mobx）
            const dataList = toJS(dataSource);
            dataList.splice(modifyPosition, deleteCount);
            snapShot.addSnap({
                positionid: dataSource[position].__idsPath,
                order,
                status: false,
                deleteCount,
                dataList: [],
            })
            setDataSource(
                mergeCells(
                    dataList,
                    drillDimOptions.map(it => it.dimKey),
                ),
            );
        } else {
            const controller = new AbortController();
            queryControlRef.current.push(controller);

            const { __dimsPath, __idsPath, ...rest } = record;

            // 发送请求前修改ref
            options.current = {
                record: {
                    dimsPath: __dimsPath,
                    idsPath: __idsPath,
                    ...rest,
                },
                drillDimOptions,
                drillDim,
                order,
                signal: controller.signal,
            };
            isLodingRef.current = true;
            run()
                .then(result => {
                    const dataSourceRecord = dataSource.find(item => isEqual(item, record));
                    dataSourceRecord.__expandedState[order] = true;
                    const dataList = toJS(dataSource);
                    dataList.splice(modifyPosition, 0, ...result.dataList);
                    snapShot.addSnap({
                        positionId: dataSource[position].__idsPath,
                        order,
                        status: true,
                        deleteCount: 0,
                        dataList: cloneDeep(result.dataList),
                    });
                    setDataSource(
                        mergeCells(
                            dataList,
                            drillDimOptions.map(it => it.dimKey),
                        )
                    )
                })
                .catch(error => {
                    if (error?.message !== 'canceled') {
                        Notification.error({
                            message: `请求异常: ${error}`
                        })
                    }
                })
                .finally(() => {
                    // 关闭loading
                    isLodingRef.current = false;
                })
        }
    }

    //columns使用useMemo优化会出问题，如果dataSource是state.dataSource可以用这种方式优化
    // 如果是useState声明的dataSource就会取不到最新值，除非列入依赖项
    const getColumns = () => {
        const columnRes: any[] = [];
        if (!tableMajorDim || !tableMinorDim || majorDimOptions.length === 0) {
            return [];
        }
        const drillDimOptions = [tableMajorDim, tableMinorDim].filter(ite => ite.dimKey !== all.dimKey);
        const dimColumns = drillDimOptions.map((option, order) => {
            const column = {
                dataIndex: `${option.value}_key`,
                title: option.label,
                fixed: 'left',
                width: 170,
            };
            // 处理主维度
            if (order === 0) {
                column.title = (
                    <div>
                        <span>{option?.label}</span>
                        <Dropdown
                            menu={{
                                items: majorDimOptions.filter(it => it.value !== '-1')
                                    .map(it => ({
                                        ...it,
                                        disabled: it.value === option.value
                                    })),
                                onClick(item) {
                                    const major = majorDimOptions.find(it => it.dimKey === `${item.key}_key`);
                                    if (major && tableMajorDim?.dimKey !== major.dimKey) {
                                        setTableMajorDim(major),
                                            setTableMinorDim(all);
                                    }
                                }
                            }}
                        >
                            <span>
                                <SwapOutlined /> 切换
                            </span>
                        </Dropdown>
                    </div>
                )
                column.onCell = record => {
                    return {
                        rowSpan: record.__rowSpans[order] ?? 1,
                    }
                }
                column.render = (_, record) => {
                    const dim = last(record.__dimsPath[order]);
                    if (!dim) {
                        return '-';
                    }

                    const key = `${dim}_name`
                    if (!key || ['全部', '未知', '-1', '-999'].includes(record[key])) {
                        return key && record[key] ? record[key] : '-'
                    }
                    const expanded = record.__expandedStates[order];
                    const level = record.__dimsPath[order]?.length;
                    const isSpecialAllRow = record.__idsPath?.[0]?.[0] === '全部'
                    const canDrill = Array.isArray(option.keys) && level < option.keys.length && !isSpecialAllRow;
                    return (
                        <div>
                            {canDrill && (
                                <Icon
                                    name={expanded ? 'chevron-down' : 'chevron-right'}
                                    size={20}
                                    onClick={() => {
                                        handleExpand(record, order)
                                    }}
                                />
                            )}
                            {key && record[key] ? record[key] : '-'}
                        </div>
                    )
                }
            } else {
                column.render = (_, record) => {
                    let value = '全部';

                    if (option.value === '-1') {
                        return value;
                    }
                    const dim = last(record.__dimsPath[order]);

                    if (dim) {
                        const key = getDimName(dim);
                        if (key && record[key]) {
                            value = record[key];
                        }
                    }

                    if (['未知', '-1', '-999', '-', ''].includes(value)) {
                        return value;
                    }

                    const expanded = record.__expandedStates[order];
                    const level = record.__dimsPath[order]?.length ?? 0;
                    const isSpecialAllRow = record.__idsPath?.[0]?.[0] === '全部'
                    const canDrill = Array.isArray(option.keys) && level < option.keys.length && !isSpecialAllRow
                    return (
                        <div>
                            {canDrill && (
                                <i
                                    className={getStatusClassNames('expanded-icon', 'h-pointer', {
                                        expanded,
                                        folded: !expanded,
                                    })}
                                    onClick={() => {
                                        handleExpand(record, order);
                                    }}
                                />
                            )}
                            {value}
                        </div>
                    )
                }
            }

            return column;
        })

        const rateInfoMap = groupBy(
            dataTitle.filter(it => it.columnType === 3),
            'originIndex',
        );

        const indexColumns = dataTitle
            .filter(it => it.columnType === 2)
            .map(index => {
                return {
                    title: () => {
                        return (
                            <span>
                                {index.text}&nbsp;
                                <Tooltip title={index.desc}>
                                    <Icon name="question-o" />
                                </Tooltip>
                            </span>
                        )
                    },
                    key: index.key,
                    children: [
                        {
                            title: '指标值',
                            key: index.key,
                            dataIndex: index.key,
                            width: 120,
                            sorter: true,
                            sortDirections: ['descend', 'ascend'],
                        },
                        ...checkedRateTypes.map(rateText => {
                            const items = rateInfoMap[index.key] ?? [];
                            const item = items.find(ite => it.text.includes(rateText));
                            if (item) {
                                return {
                                    title: rateText,
                                    key: item.key,
                                    dataIndex: item.key,
                                    width: 120,
                                    sorter: true,
                                    sortDirections: ['descend', 'ascend'],
                                    render(value) {
                                        return value ? <NumberTrend value={value} /> : '-';
                                    }
                                }
                            }
                            return false;
                        })
                    ].filter(identity)
                }
            })

        columnRes.push(...dimColumns, ...indexColumns);
        return columnRes;
    }

    useEffect(() => {
        if (selectedIndexes.length === 0 || !tableMajorDim) {
            return;
        }
        setDataSource([]);
        queryControlRef.current.forEach(controller => controller?.abort());
        queryControlRef.current = [];

        const controller = new AbortController();
        queryControlRef.current.push(controller);

        const drillDimOptions = [tableMajorDim, tableMinorDim];
        dataTitleRef.current = [];

        // 查询数据前设置ref
        options.current = {
            record: {
                dimsPath: [[], []],
                idsPath: [[], []],
            },
            order: 0,
            drillDim: tableMajorDim.keys[0],
            drillDimOptions,
            signal: controller.signal,
        };

        run()
            .then(result => {
                setDataSource(result.dataList);
                setDataTitle(result.dataTitle);
                snapShot.reset([]);
                snapShot.addSnap(
                    {
                        positionId: null,
                        order: -1,
                        status: false,
                        deleteCount: 0,
                        dataList: cloneDeep(result.dataList),
                    }
                )
                if (isFirstColumnDefaultExpanded) {
                    setTimeout(() => tableAutoExpandFirstLevel(isLodingRef))
                }
            })
            .catch(error => {
                if (error?.message !== 'canceled') {
                    notification.error({
                        message: `请求异常${}`
                    })
                }
            })
            .finally(() => {
                // 设置loading
            })

    }, [selectedIndexes, tableMajorDim, tableMinorDim, checkedRateTypes])

    const dimFilterOptions = useMemo(() => {
        return [all].concat(majorDimOptions.filter(it => it.dimKey !== tableMajorDim?.dimKey));
    }, [tableMajorDim, tableMinorDim]);

    const sortDataSource = () => {
        if (!tableMajorDim || !tableMinorDim) {
            return;
        }
        const drillDimOptions = [tableMajorDim, tableMinorDim];
        const dataList = snapShot.flush((action, store) => {
            if (action.positionId === null) {
                if (sortInfo) {
                    return orderBy(
                        action.dataList,
                        [sortInfo.key].map(key => {
                            return it => {
                                if (it.__dimsPath[0]?.[0] && it[it.__dimsPath[0]?.[0]] === '全部' && sortInfo) {
                                    return sortInfo.sortType === 1 ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
                                }
                                return numeral(it[key]).value();
                            }
                        }),
                        [sortInfo.sortType === 1 ? 'asc' : 'desc'],
                    )

                }
                return cloneDeep(action.dataList);
            }

            const position = store.findIndex(it => isEqual(it.__idsPath, action.positionId));
            let modifyPosition = position+1;
            if(action.order < drillDimOptions.length - 1){
                for(let i = modifyPosition; i < store.length; i++){
                    if(!isEqual(action.positionId[action.order], store[i].__idsPath[action.order])){
                        break;
                    }
                    modifyPosition += 1;
                }
            }

            if(action.order !== -1){
                store[position].__expandedStates[action.order] = action.status;
            }
            let list;
            if(sortInfo){
                list = orderBy(
                    action.dataList,
                    [sortInfo.key].map(key => {
                        return it => numeral(it[key]).value();
                    }),
                    [sortInfo.sortType === 1 ? 'asc' : 'desc'],
                )
            }else{
                list = cloneDeep(action.dataList);
            }
            store.splice(modifyPosition, action.deleteCount, ...list);
            return store;
        })
        setDataSource(
            mergeCells(
                dataList,
                drillDimOptions.map(it => it.dimKey),
            )
        )
    }

    useEffect(() => {
        sortDataSource();
    }, [sortInfo]);

    return (
        <div>
            <Row gutter={20}>
                <Col span={12}>
                    <DimFilter 
                        options={dimsFilterOptions}
                        value={[tableMinorDim.value]}
                        multiply={false}
                        onChange={([val]) => {
                            const minor = dimFilterOptions.find(it => it.value === val);
                            if(minor){
                                setTableMinorDim(minor);
                            }else if(val === all.value){
                                setTableMinorDim(all);
                            }
                        }}
                    />
                </Col>
                <MultiDimCrossTable 
                    rowKey = {record => flattenDeep(record.__idsPath).join()}
                    column = {getColumns()}
                    dataSource={dataSource}
                    locale={
                        {
                            triggerDesc: '点击降序',
                            triggerAsc: '点击升序',
                            cancelSort: '取消排序'
                        }
                    }
                    onChange={(_,_,sorter) => {
                        if(!Array.isArray(sorter) && sorter.order && sorter.columnKey){
                            setSortInfo({
                                key: String(sorter.columnKey),
                                sortType: sorter.order === 'descend' ? 2 : 1,
                            })
                        }else{
                            setSortInfo(undefined);
                        }
                    }}
                />
            </Row>
        </div>
    )
}

export default CardBizObserver(BizDrillTable);