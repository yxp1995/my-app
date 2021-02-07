import React, { Component } from 'react'

import FilterFooter from '../../../../components/FilterFooter'

import styles from './index.module.css'

export default class FilterMore extends Component {
  state = {
    activeTag: {
      roomType: '',
      oriented: '',
      floor: '',
      characteristic: ''
    }
  }
  // 渲染标签
  renderFilters(type) {
    const { dataDetail } = this.props
    const { activeTag } = this.state
    let arr = []
    // 高亮类名： styles.tagActive
    switch (type) {
      case 'roomType':
        arr = dataDetail.roomType
        break;
      case 'oriented':
        arr = dataDetail.oriented
        break;
      case 'floor':
        arr = dataDetail.floor
        break;
      case 'characteristic':
        arr = dataDetail.characteristic
        break;
      default:
        break;
    }
    return (
      arr.map((item) => {
        return <span className={[styles.tag, item.value === activeTag[type] ? styles.tagActive : ''].join(' ')} onClick={() => { this.setActive(type, item.value) }} key={item.value}>
          {item.label}
        </span>
      })
    )
  }
  setActive = (type, active) => {
    this.setState((state) => {
      return {
        activeTag: { ...state.activeTag, [type]: active }
      }
    })
  }
  render() {
    const { moreCancel, moreSave, type } = this.props
    const { activeTag } = this.state
    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div className={styles.mask} onClick={() => { moreCancel(type) }} />

        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilters('roomType')}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilters('oriented')}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilters('floor')}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderFilters('characteristic')}</dd>
          </dl>
        </div>

        {/* 底部按钮 */}
        <FilterFooter className={styles.footer} onCancel={() => { moreCancel(type) }} onSave={() => { moreSave(activeTag, type, 'more') }} />
      </div>
    )
  }
}
