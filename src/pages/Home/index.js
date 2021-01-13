import React from "react";
import { Carousel, Flex, Grid, Card, WingBlank, NavBar, Icon } from 'antd-mobile';
import { withRouter } from "react-router-dom";
import { getSwiper, getGroups, getNews } from "../../api/home.js";
import Nav1 from '../../assets/images/nav-1.png';
import Nav2 from '../../assets/images/nav-2.png';
import Nav3 from '../../assets/images/nav-3.png';
import Nav4 from '../../assets/images/nav-4.png';
import { getCurrCity } from '../../utils/getCurrCity.js';
import { getCity, setCity } from '../../utils/localstorage/city.js';
import "./index.css";

const FlexList = [
    {
        id: 1,
        img: Nav1,
        title: '整租',
        path: '/Home/list1'
    },
    {
        id: 2,
        img: Nav2,
        title: '合租',
        path: '/Home/list2'
    },
    {
        id: 3,
        img: Nav3,
        title: '地图找房',
        path: '/Home/list3'
    },
    {
        id: 4,
        img: Nav4,
        title: '去出租',
        path: '/Home/list4'
    }
]
class Index extends React.PureComponent {
    state = {
        data: [],
        imgHeight: 234,
        animation: false,
        zfxzList: [],
        newsList: [],
        cityInfo: { label: "定位中", value: "" }
    }
    componentDidMount() {
        this.getPic();
        this.getGroups();
        this.getNews();
        this.getCurrCity();
    }
    getPic = async () => {
        const res = await getSwiper();
        this.setState(() => {
            return {
                data: res.data.body,
            }
        }, () => {
            this.setState(() => {
                return {
                    animation: true
                }
            })
        })
    }
    setSwiper = () => {
        return this.state.data.map(item => (
            <a
                key={item.id}
                href="http://www.alipay.com"
                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
                <img
                    src={`http://localhost:8080${item.imgSrc}`}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => { // 图片载入完成后执行时间中的代码
                        // fire window resize event to change height
                        window.dispatchEvent(new Event('resize'));  // 给window添加resize事件
                        this.setState({ imgHeight: 'auto' });  // 设置图片高度
                    }}
                />
            </a>
        ))
    }
    setFlex = () => {
        return <Flex justify="center" className="FlexBox">
            {this.mapFlex()}
        </Flex>
    }
    getGroups = async () => {
        const res = await getGroups({ area: "AREA|88cff55c-aaa4-e2e0" });
        if (res.status === 200) {
            this.setState(() => {
                return { zfxzList: res.data.body }
            })
        }
    }
    mapFlex = () => {
        return FlexList.map(item => {
            return <Flex.Item key={item.id} className="flexItem"
                onClick={() => {
                    this.props.history.push(item.path)
                }}
            >
                <img src={item.img} alt="图片加载失败" />
                <p>{item.title}</p>
            </Flex.Item>
        })
    }
    getNews = async () => {
        const res = await getNews({ area: 'AREA|88cff55c-aaa4-e2e0' });
        if (res.status === 200) {
            this.state.newsList = res.data.body
        }
    }
    setZx = () => {
        return this.state.newsList.map(item => {
            return (
                <Card key={item.id}>
                    <Card.Body className="Card">
                        <div className="left">
                            <img src={`http://localhost:8080${item.imgSrc}`} alt="图片加载失败" />
                        </div>
                        <div className="right">
                            <WingBlank><h4>{item.title}</h4></WingBlank>
                            <div className="footer">
                                <WingBlank><span>{item.from}</span></WingBlank>
                                <WingBlank><span>{item.date}</span></WingBlank>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            )
        })
    }
    getCurrCity = () => {
        const currentCIty = getCity();
        if (!currentCIty) {
            getCurrCity().then(res => {
                setCity(res);
                this.setState(() => {
                    return { cityInfo: res }
                })
            })
        } else {
            this.setState(() => {
                return { cityInfo: currentCIty }
            })
        }
    }
    render() {
        return (
            <div>
                {/* 顶部导航 */}
                <NavBar
                    mode="dark"
                    leftContent={
                        <span
                            onClick={() => {
                                this.props.history.push("/CityList")
                            }}
                        >{this.state.cityInfo.label}</span>
                    }
                    rightContent={[
                        // <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" onClick={() => {
                            this.props.history.push("/map")
                        }} />,
                    ]}
                    className="navbar"
                >首页</NavBar>
                {/* 轮播 */}
                <Carousel
                    infinite
                    autoplay={this.state.animation}
                    className="lunbo"
                >
                    {this.setSwiper()}
                </Carousel>
                {/* 菜单 */}
                <div>
                    {this.setFlex()}
                </div>
                {/* 租房小组 */}
                <Flex className="zfxzBox" justify="between">
                    <h3>租房小组</h3>
                    <p>更多</p>
                </Flex>
                {/* 宫格 */}
                <Grid
                    data={this.state.zfxzList}
                    columnNum={2}
                    hasLine={false}
                    square={false}
                    renderItem={dataItem => (
                        <div className="zfxzList">
                            <div className="left">
                                <h4>{dataItem.title}</h4>
                                <p>{dataItem.desc}</p>
                            </div>
                            <div className="right">
                                <img src={`http://localhost:8080${dataItem.imgSrc}`} alt="图片加载失败" />
                            </div>
                        </div>
                    )}
                    className="Grid"
                    itemStyle={{ background: '#fff' }}
                />
                {/* 咨询 */}
                <div className="axBox">
                    <h3 className="title">最新资讯</h3>
                    {this.setZx()}
                </div>

            </div>

        )
    }
}

export default withRouter(Index);