import React, { Component } from 'react'

import { SearchBar, Toast } from 'antd-mobile'

import { getCurrCity } from '../../../utils/getCurrCity.js'

import { searchCommunity } from '../../../api/search.js'

import styles from './index.module.css'

export default class Search extends Component {
  // 当前城市id
  // cityId = getCurrCity().value

  state = {
    // 搜索框的值
    searchTxt: '',
    tipsList: [],
    city: {}
  }

  // 渲染搜索结果列表
  renderTips = () => {
    const { tipsList } = this.state

    return tipsList.map(item => (
      <li key={item.community} className={styles.tip} onClick={() => {this.toRent(item)}}>
        {item.communityName}
      </li>
    ))
  }
  setValue = (val) => {
    this.setState(() => {
      return {
        searchTxt: val.trim()
      }
    }, async () => {
      const city = await getCurrCity()
      this.setState(() => {
        return {
          city
        }
      }, async () => {
        const { city, searchTxt } = this.state
        const params = {
          name: searchTxt,
          id: city.value
        }
        const { data } = await searchCommunity(params)
        if (data.status === 200) {
          this.setState(() => {
            return {
              tipsList: data.body
            }
          })
        } else {
          Toast.fail(data.description, 1, null, false)
        }
      })
    })
  }
  toRent = (item) => {
    console.log(item)
    this.props.history.push('/Home/rent/add',item)
  }
  render() {
    const { history } = this.props
    const { searchTxt } = this.state

    return (
      <div className={styles.root}>
        {/* 搜索框 */}
        <SearchBar
          placeholder="请输入小区或地址"
          value={searchTxt}
          onChange={this.setValue}
          showCancelButton={true}
          onCancel={() => history.replace('/Home/rent/add')}
        />

        {/* 搜索提示列表 */}
        <ul className={styles.tips}>{this.renderTips()}</ul>
      </div>
    )
  }
}
