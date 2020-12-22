import React from "react";
import { Carousel } from 'antd-mobile';
import { withRouter } from "react-router-dom";
import axios from "axios"


class Index extends React.PureComponent {
    state = {
        data: [],
        imgHeight: 234,
    }
    componentDidMount() {
        this.getPic();
    }
    getPic = async () => {
        const res = await axios.get("http://localhost:8080/home/swiper");
        this.setState(() => {
            return { data: res.data.body }
        })
    }
    render() {
        return (
            <Carousel
                autoplay={false}
                infinite
                beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                afterChange={index => console.log('slide to', index)}
            >
                {this.state.data.map(item => (
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
                ))}
            </Carousel>
        )
    }
}

export default withRouter(Index);