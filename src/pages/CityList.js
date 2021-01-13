import React from "react";
import {
    withRouter
} from "react-router-dom";
import {
    NavBar
} from 'antd-mobile';
import {
    getAirCity,
    getHotCity
} from '../api/CityList.js';
import {
    getCity,
    setCity
} from '../utils/localstorage/city.js';
import {
    getCurrCity
} from '../utils/getCurrCity.js';
import "./CityList.css";

import { List, AutoSizer } from 'react-virtualized';
import { Toast } from 'antd-mobile';
import 'react-virtualized/styles.css';

class CityList extends React.PureComponent {
    getAirCity = async () => {
        const res = await getAirCity({
            level: 1
        });
        if (res.status === 200) {
            this.setState(() => {
                return {
                    airCity: res.data.body
                }
            }, () => {
                // 处理数据 按照字母排序
                let cityLIst = {};
                let cityIndex = [];
                this.state.airCity.forEach(item => {
                    if (item.short.substr(0, 1) in cityLIst) {
                        cityLIst[item.short.substr(0, 1)].push(item)
                    } else {
                        cityLIst[item.short.substr(0, 1)] = [item]
                    }
                })
                cityIndex = Object.keys(cityLIst).sort();
                this.setState(() => {
                    return {
                        cityLIst: cityLIst,
                        cityIndex: cityIndex
                    }
                })
            })
        }
        // 处理数据 热门城市
        const hotData = await getHotCity();
        if (hotData.status === 200) {
            let cityLIst = this.state.cityLIst;
            let cityIndex = this.state.cityIndex;
            cityIndex.unshift("hot");
            cityLIst.hot = hotData.data.body;
            this.setState(() => {
                return {
                    cityLIst: cityLIst,
                    cityIndex: cityIndex
                }
            })
        }
        // 处理数据 当前城市
        const currentCIty = await getCity();
        if (!currentCIty) {
            const nowCity = await getCurrCity();
            setCity(nowCity);
            let cityIndex = this.state.cityIndex;
            let cityLIst = this.state.cityLIst;
            cityIndex.unshift("#");
            cityLIst["#"] = [nowCity];
            this.setState(() => {
                return {
                    cityIndex,
                    cityLIst
                }
            }, () => {
                this.forceUpdate()  // 强制刷新页面
            })
        } else {
            let cityIndex = this.state.cityIndex;
            let cityLIst = this.state.cityLIst;
            cityIndex.unshift("#");
            cityLIst["#"] = [currentCIty];
            this.setState(() => {
                return {
                    cityIndex,
                    cityLIst
                }
            }, () => {
                this.forceUpdate();  // 强制刷新页面
            })
        }
    }
    setRowHeight = ({ index }) => {
        return 44 + this.state.cityLIst[this.state.cityIndex[index]].length * 28
    }
    mapLIst = (rowList) => {
        return rowList.map((item, index) => {
            return (
                <li onClick={() => this.setCityOk(item)} key={index} className="citySon">{item.label}</li>
            )
        })
    }
    setCityOk = (val) => {
        if(["北京","上海","深圳","广州"].includes(val.label)) {
            setCity(val);
            this.props.history.push("/Home");
        }else {
            Toast.info('当前城市无房源 !!!');
        }
    }
    state = {
        airCity: [],
        cityLIst: {},
        cityIndex: []
    }
    // 渲染每行内容
    rowRenderer = ({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        style, // Style object to be applied to row (to position it)
    }) => {
        return (
            <div key={key} style={style} className="cityLi">
                <div className="cityIndex">{this.state.cityIndex[index]}</div>
                <ul className="cityItem">
                    {this.mapLIst(this.state.cityLIst[this.state.cityIndex[index]])}
                </ul>
            </div>
        );
    }

    componentDidMount() {
        this.getAirCity();
    }
    render() {
        const { cityIndex } = this.state;
        return (<div className="cityListBox">
            <NavBar mode="dark"
                leftContent={
                    <span onClick={
                        () => {
                            this.props.history.push("/Home")
                        }
                    } > 返回
                    </span>
                }
                className="navbar" >
                选择城市
            </NavBar>
            {cityIndex.length === 21 && <AutoSizer>
                {({ height, width }) => {
                    return (
                        <List
                            width={width}
                            height={height - 45}
                            rowCount={cityIndex.length}
                            rowHeight={this.setRowHeight}
                            rowRenderer={this.rowRenderer}
                            className="virtualized"
                        />
                    )
                }}
            </AutoSizer>}
        </ div >
        )
    }
}

export default withRouter(CityList)