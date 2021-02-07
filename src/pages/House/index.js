import React from "react";
// import { Flex } from 'antd-mobile'

import Filter from './components/Filter'
// 导入样式
import styles from './index.module.css'
import { withRouter } from "react-router-dom";
import { filterHouse } from '../../api/picker.js';
import { getCity } from '../../utils/localstorage/city.js'



// 获取当前定位城市信息
// const { label } = JSON.parse(localStorage.getItem('currentCity'))
class HouseList extends React.Component {
    state = {
        houseList: [],
        total: 0
    }
    houseFilter = async (val) => {
        const { value = 'AREA|88cff55c-aaa4-e2e0' } = getCity()
        const obj = {
            value,
            ...val,
            start: 1,
            end: 10
        }
        const { data } = await filterHouse(obj)
        if (data.status === 200) {
            this.setState(() => {
                return {
                    houseList: data.body.list,
                    total: data.body.count
                }
            }, () => {
                // console.log('houselist:', this.state.houseList, this.state.total)
            })
        }
    }
    componentDidMount() {
        const filterCondition = {}
        this.houseFilter(filterCondition);
    }
    render() {
        return (
            <div className={styles.root}>
                {/* 条件筛选栏 */}
                <Filter houseFilter={this.houseFilter} />
            </div>
        )
    }
}

export default withRouter(HouseList);