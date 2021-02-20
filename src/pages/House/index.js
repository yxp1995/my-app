import React from "react";
import { Toast } from 'antd-mobile'

import Filter from './components/Filter'
// 导入样式
import styles from './index.module.css'
import { withRouter } from "react-router-dom";
import { filterHouse } from '../../api/picker.js';
import { getCity } from '../../utils/localstorage/city.js';
import HouseItem from './HouseItem/index.js';
import HouseClear from './houseClear/index.js';
import { AutoSizer, List, WindowScroller, InfiniteLoader } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once



// 获取当前定位城市信息
// const { label } = JSON.parse(localStorage.getItem('currentCity'))
class HouseList extends React.Component {
    state = {
        houseList: [],
        total: 0,
        filterCondition: {},
        isLoading: false
    }
    rowRenderer = ({ key, index, style }) => {
        const { houseList } = this.state
        const state = houseList[index]
        if (state === undefined) {
            return <div key={key} style={style}>
                <div className={styles.loading}>加载中...</div>
            </div>
        }
        return (
            <HouseItem key={key} style={style} {...state} />
        );
    }
    houseFilter = async (val) => {
        Toast.loading('加载中...', 0, null, false)
        const { value = 'AREA|88cff55c-aaa4-e2e0' } = getCity()
        const obj = {
            cityId: value,
            ...val,
            start: 1,
            end: 20
        }
        this.setState(() => {
            return {
                filterCondition: obj,
                isLoading: false
            }
        })
        const { data } = await filterHouse(obj)
        if (data.status === 200) {
            Toast.hide()
            Toast.info(`共加载${data.body.count}条房源数据`,2,null,false)
            this.setState(() => {
                return {
                    houseList: data.body.list,
                    total: data.body.count,
                    isLoading: true
                }
            }, () => {
                console.log('houselist:', this.state.houseList, this.state.total)
                this.forceUpdate()
            })
        }
    }
    isRowLoaded = ({ index }) => {
        const { houseList } = this.state
        return !!houseList[index];
    }

    loadMoreRows = ({ startIndex, stopIndex }) => {
        console.log(startIndex, stopIndex)
        const { value = 'AREA|88cff55c-aaa4-e2e0' } = getCity()
        const { filterCondition } = this.state
        const obj = {
            cityId: value,
            ...filterCondition,
            start: startIndex,
            end: stopIndex
        }
        return new Promise(async (resolve) => {
            const { data } = await filterHouse(obj)
            if (data.status === 200) {
                this.setState((state) => {
                    return {
                        houseList: [...state.houseList, ...data.body.list]
                    }
                }, () => {
                    this.forceUpdate()
                })
            }
            resolve()
        })
    }
    setList = () => {
        const { total } = this.state
        // console.log(total)
        return (
            <InfiniteLoader
                isRowLoaded={this.isRowLoaded}
                loadMoreRows={this.loadMoreRows}
                rowCount={total}
            >
                {({ onRowsRendered }) => (
                    <WindowScroller>
                        {({ height, isScrolling, onChildScroll, scrollTop }) => (
                            <AutoSizer>
                                {({ width }) => (
                                    <List
                                        autoHeight
                                        height={height}
                                        rowCount={total}
                                        rowHeight={120}
                                        rowRenderer={this.rowRenderer}
                                        width={width}
                                        isScrolling={isScrolling}
                                        onScroll={onChildScroll}
                                        scrollTop={scrollTop}
                                        onRowsRendered={onRowsRendered}
                                    />
                                )}
                            </AutoSizer>
                        )}
                    </WindowScroller>
                )}
            </InfiniteLoader>
        )
    }
    isNull = () => {
        return <HouseClear></HouseClear>
    }
    houseItemClick = () => {
        console.log("点击")
    }
    componentDidMount() {
        const filterCondition = {}
        this.houseFilter(filterCondition);
    }
    render() {
        const { total, isLoading } = this.state
        return (
            <div className={styles.root}>
                {/* 条件筛选栏 */}
                <Filter houseFilter={this.houseFilter} />
                {total !==0 && this.setList()}
                {total === 0 && isLoading && this.isNull()}
            </div>
        )
    }
}

export default withRouter(HouseList);