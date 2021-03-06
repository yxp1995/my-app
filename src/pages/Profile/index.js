import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { Grid, Button, Toast } from 'antd-mobile'
import styles from './index.module.css'
import { isToken, removeToken } from '../../utils/localstorage/token'
import { getInfo, logout } from '../../api/profile.js'
const BASE_URL = "http://localhost:8080"

// 菜单数据
const menus = [
  { id: 1, name: '我的收藏', iconfont: 'icon-coll', to: '/favorate' },
  { id: 2, name: '我的出租', iconfont: 'icon-ind', to: '/Home/rent' },
  { id: 3, name: '看房记录', iconfont: 'icon-record' },
  {
    id: 4,
    name: '成为房主',
    iconfont: 'icon-identity'
  },
  { id: 5, name: '个人资料', iconfont: 'icon-myinfo' },
  { id: 6, name: '联系我们', iconfont: 'icon-cust' }
]
export default class Profile extends Component {
  state = {
    isLogin: false,
    nickname: '游客',
    gender: 0,
    DEFAULT_AVATAR: BASE_URL + '/img/profile/avatar.png'
  }
  componentDidMount() {
    this.setState(() => {
      return {
        isLogin: isToken()
      }
    }, () => {
      const { isLogin } = this.state
      if (isLogin) {
        this.getInfo()
      }
    })
  }
  getInfo = async () => {
    const { data } = await getInfo()
    if (data.status === 200) {
      this.setState(() => {
        return {
          nickname: data.body.nickname,
          DEFAULT_AVATAR: BASE_URL + data.body.avatar,
          gender: data.body.gender
        }
      })
    } else {
      Toast.fail(data.description, 2, null, false)
    }
  }
  dropout = async () => {
    const { data } = await logout()
    if (data.status === 200) {
      Toast.success(data.description, 2, null, false)
      removeToken("token")
      this.setState(() => {
        return {
          isLogin: false
        }
      },() => {
        this.props.history.push('/Login')
      })
      
    }else {
      Toast.fail(data.description, 2, null, false)
    }
  }
  edit = () => {
    console.log("编辑")
  }
  render() {
    const { history } = this.props
    const { isLogin, nickname, DEFAULT_AVATAR } = this.state

    return (
      <div className={styles.root}>
        {/* 个人信息 */}
        <div className={styles.title}>
          <img
            className={styles.bg}
            src={BASE_URL + '/img/profile/bg.png'}
            alt="背景图"
          />
          <div className={styles.info}>
            <div className={styles.myIcon}>
              <img className={styles.avatar} src={DEFAULT_AVATAR} alt="icon" />
            </div>
            <div className={styles.user}>
              <div className={styles.name}>{nickname}</div>
              {/* 登录后展示： */}
              {/* <>
                <div className={styles.auth}>
                  <span onClick={this.logout}>退出</span>
                </div>
                <div className={styles.edit}>
                  编辑个人资料
                  <span className={styles.arrow}>
                    <i className="iconfont icon-arrow" />
                  </span>
                </div>
              </> */}

              {/* 未登录展示： */}
              <div className={styles.edit}>
                {!isLogin ? <Button
                  type="primary"
                  size="small"
                  inline
                  onClick={() => history.push('/Login')}
                >
                  去登录
                </Button>
                  : <span>
                    <span className={styles.isLigin} onClick={this.dropout}>退出</span>
                    <br />
                    <div onClick={this.edit} className={styles.loginEdit}>
                      <span className={styles.editProfile}>编辑个人资料</span>
                      <span className={`iconfont icon-arrow ${styles.editArrow}`}></span>
                    </div>
                  </span>}
              </div>
            </div>
          </div>
        </div>

        {/* 九宫格菜单 */}
        <Grid
          data={menus}
          columnNum={3}
          hasLine={false}
          renderItem={item =>
            item.to ? (
              <Link to={item.to}>
                <div className={styles.menuItem}>
                  <i className={`iconfont ${item.iconfont}`} />
                  <span>{item.name}</span>
                </div>
              </Link>
            ) : (
                <div className={styles.menuItem}>
                  <i className={`iconfont ${item.iconfont}`} />
                  <span>{item.name}</span>
                </div>
              )
          }
        />

        {/* 加入我们 */}
        <div className={styles.ad}>
          <img src={BASE_URL + '/img/profile/join.png'} alt="" />
        </div>
      </div>
    )
  }
}
