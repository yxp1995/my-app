import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
// import FilterMore from '../FilterMore'
import { getCondition } from '../../../../api/picker.js'

import styles from './index.module.css'

export default class Filter extends Component {
  state = {
    activeList: {
      area: false,
      mode: false,
      price: false,
      more: false
    },
    pickerOpen: '',
    pickDataAll: {},
    pickerSelect: {
      area: [],
      mode: ["null"],
      price: ["null"]
    }
  }
  setActive = (active, isOther = false) => {
    const { pickerSelect, activeList } = this.state
    let activeList2 = { ...activeList }
    Object.keys(activeList).forEach(item => {
      if (!isOther) {
        if (item === active) {
          activeList2[item] = true
        }
      }
      if (item !== active) {
        activeList2[item] = false
      }
      if (item === "area") {
        if (pickerSelect[item].length === 3) {
          activeList2[item] = true
        } else if (pickerSelect[item][0] == "subway") {
          activeList2[item] = true
        }
      } else if (item === "mode") {
        if (pickerSelect[item][0] !== "null") {
          activeList2[item] = true
        }
      } else if (item === "price") {
        if (pickerSelect[item][0] !== "null") {
          activeList2[item] = true
        }
      }
      this.setState(() => {
        return {
          activeList: activeList2,
          pickerOpen: active
        }
      })
    })

    // for(let key in activeList2) {
    //   if(key == active) {
    //     activeList2[active] = true
    //     this.setState(() => {
    //       return {
    //         activeList: activeList2,
    //         pickerOpen: active
    //       }
    //     })
    //   }else {
    //     activeList2[key] = false
    //     this.setState(() => {
    //       return {
    //         activeList: activeList2
    //       }
    //     })
    //   }
    // }
    console.log(activeList)
    // this.setState(() => {
    //   return {
    //     activeList: { ...this.state.activeList, [active]: true },
    //     pickerOpen: active
    //   }
    // })
  }
  onCancel = () => {
    this.setActive(null, true)
    this.setState(() => {
      return {
        pickerOpen: ''
      }
    })
  }
  onSave = (val, type) => {
    console.log(val, type)
    this.setState((state) => {
      return {
        pickerOpen: '',
        pickerSelect: { ...state.pickerSelect, [type]: val }
      }
    }, () => {
      this.setActive(null, true)
    })
  }
  getDistrict = () => {
    const city = {
      id: JSON.parse(localStorage.getItem("currentCity")).value
    }
    getCondition(city).then(res => {
      console.log(res)
      if (res.status === 200) {
        this.setState(() => {
          return {
            pickDataAll: res.data.body
          }
        }, () => {
          console.log(this.state.pickDataAll)
        })
      }
    })
  }
  setPicker = () => {
    const { pickerOpen, pickerSelect, pickDataAll: { area, subway, rentType, price } } = this.state
    if (pickerOpen === "area" || pickerOpen === "mode" || pickerOpen === "price") {
      const pickerSelectDefault = pickerSelect[pickerOpen]
      let data = []
      let col = 1
      switch (pickerOpen) {
        case "area":
          data = [area, subway]
          col = 3
          break;
        case "mode":
          data = rentType
          break
        case "price":
          data = price
          break
        default:
          data = [area, subway]
          col = 3
          break;
      }
      // 点击type切换picker时由于组件没有销毁只是内容变了 , 所以不会重新触发constructor钩子导致picker中的value不更新
      // 1. 利用componentDidUpdate监听props.type变化来重新给state.value赋值
      // 2. 在调用FilterPicker占位符中设置key值 , 不设置的话多次点击tab切换只是渲染多个picker而不更新老组件
      //    而加上key后, 对比虚拟DOM时就可以根据key值唯一标识去对应上唯一的picker了, 而不是原始的按照索引去对比
      return <FilterPicker
        key={pickerOpen}
        filterData={data}
        col={col}
        type={pickerOpen}
        pickerSelectDefault={pickerSelectDefault}
        onCancel={this.onCancel}
        onSave={this.onSave}
      />
    } else {
      return null
    }
  }
  componentDidMount() {
    this.getDistrict();
  }
  render() {
    const { activeList, pickerOpen } = this.state;
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {(pickerOpen === "area" || pickerOpen === "mode" || pickerOpen === "price") && <div className={styles.mask} onClick={this.onCancel} />}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle active={activeList} activeClick={this.setActive} />

          {/* 前三个菜单对应的内容： */}
          {this.setPicker()}

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
