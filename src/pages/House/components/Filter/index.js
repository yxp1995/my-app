import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import styles from './index.module.css'

export default class Filter extends Component {
  state = {
    activeList: {
      area: true,
      mode: false,
      price: false,
      more: false
    },
    pickerOpen: ''
  }
  setActive = (active) => {
    this.setState(() => {
      return {
        activeList: { ...this.state.activeList, [active]: true },
        pickerOpen: active
      }
    })
  }
  onCancel = () => {
    this.setState(() => {
      return {
        pickerOpen: ''
      }
    })
  }
  onSave = () => {
    this.setState(() => {
      return {
        pickerOpen: ''
      }
    })
  }
  render() {
    const { activeList, pickerOpen } = this.state;
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {(pickerOpen === "area" || pickerOpen === "mode" || pickerOpen === "price") && <div className={styles.mask} onClick={this.onCancel}/>}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle active={activeList} activeClick={this.setActive} />

          {/* 前三个菜单对应的内容： */}
          {(pickerOpen === "area" || pickerOpen === "mode" || pickerOpen === "price") && <FilterPicker onCancel={this.onCancel} onSave={this.onSave} />}

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
