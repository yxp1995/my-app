import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'
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
    },
    filterCondition: {
      area: '',
      subway: '',
      rentType: '',
      price: '',
      more: ''
    }
  }
  bodyDom = {}
  setActive = (active) => {
    // 给body添加类名, 此类名在最外层css中设置了overflow:hidden
    // 作用是picker弹出时不让列表滚动,在Picker关闭时需要将此类名删除
    this.bodyDom.classList.add("scrollAuto");
    const { pickerSelect, activeList } = this.state
    let activeList2 = { ...activeList }
    Object.keys(activeList).forEach(item => {
      if (item === active) {
        activeList2[item] = true
      } else {
        activeList2[item] = false
      }
      if (item === "area") {
        if (pickerSelect[item].length === 3) {
          activeList2[item] = true
        } else if (pickerSelect[item][0] === "subway") {
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
      } else if (item === "more") {
        activeList2[item] = true
      }

      this.setState(() => {
        return {
          activeList: activeList2,
          pickerOpen: active
        }
      })
    })
  }
  onCancel = (active) => {
    this.bodyDom.classList.remove("scrollAuto")
    const { pickerSelect, activeList } = this.state
    let activeList2 = { ...activeList }
    if (active === "area") {
      if (pickerSelect[active].length === 3) {
        activeList2[active] = true
      } else if (pickerSelect[active][0] === "subway") {
        activeList2[active] = true
      } else {
        activeList2[active] = false
      }
    } else if (active === "mode") {
      if (pickerSelect[active][0] !== "null") {
        activeList2[active] = true
      } else {
        activeList2[active] = false
      }
    } else if (active === "price") {
      if (pickerSelect[active][0] !== "null") {
        activeList2[active] = true
      } else {
        activeList2[active] = false
      }
    } else if (active === "more") {
      activeList2[active] = true
    }
    this.setState(() => {
      return {
        activeList: activeList2,
        pickerOpen: ''
      }
    })
  }
  onSave = (val, active, type) => {
    this.bodyDom.classList.remove("scrollAuto")
    const { activeList } = this.state
    let activeList2 = { ...activeList }
    let filterCondition = {}
    let active2 = active
    if (type === "picker") {
      if (active === "area") {
        if (val.length === 3) {
          activeList2[active] = true
        } else if (val[0] === "subway") {
          activeList2[active] = true
        } else {
          activeList2[active] = false
        }
      } else if (active === "mode") {
        if (val[0] !== "null") {
          activeList2[active] = true
        } else {
          activeList2[active] = false
        }
      } else if (active === "price") {
        if (val[0] !== "null") {
          activeList2[active] = true
        } else {
          activeList2[active] = false
        }
      } else if (active === "more") {
        activeList2[active] = true
      }
      // 点击确定后将选中的条件包装成对象发送给后台
      if (active === "area" && val[0] === "area") {// 区域/地铁
        if (val[val.length - 1] !== "null") {
          filterCondition.area = val[val.length - 1]
        } else if (val[val.length - 1] === "null" && val.length === 3) {
          filterCondition.area = val[val.length - 2]
        } else if (val[val.length - 1] === "null" && val.length === 2) {
          filterCondition.area = ""
        }
      } else if (active === "area" && val[0] === "subway") {
        if (val[val.length - 1] !== "null") {
          filterCondition.subway = val[val.length - 1]
        } else if (val[val.length - 1] === "null" && val.length === 3) {
          filterCondition.subway = ""
        } else if (val[val.length - 1] === "null" && val.length === 2) {
          filterCondition.subway = ""
        }
      } else if (active === "mode") {// 方式
        filterCondition.rentType = val[0]
      } else if (active === "price") {// 租金
        filterCondition.price = val[0].split("|")[1]
      } else if (active === "more") {
        filterCondition.more = ""
      }

      if (active2 === "mode") {
        active2 = "rentType"
      } else if (active2 === "area" && val[0] === "subway") {
        active2 = "subway"
        this.setState((state) => {
          return {
            filterCondition: { ...state.filterCondition, "area": "" }
          }
        })
      } else if (active2 === "area" && val[0] === "area") {
        this.setState((state) => {
          return {
            filterCondition: { ...state.filterCondition, "subway": "" }
          }
        })
      }
    }else {
      let values = Object.values(val)
      let valStr = values.join(",")
      filterCondition[active2] = valStr
    }

    this.setState((state) => {
      return {
        pickerOpen: '',
        activeList: activeList2,
        pickerSelect: { ...state.pickerSelect, [active]: val },
        filterCondition: { ...state.filterCondition, [active2]: filterCondition[active2] }
      }
    }, async () => {
      const { houseFilter } = this.props
      houseFilter(this.state.filterCondition)
      window.scrollTo(0,0)
    })
  }
  getDistrict = () => {
    const city = {
      id: JSON.parse(localStorage.getItem("currentCity")).value
    }
    getCondition(city).then(res => {
      if (res.status === 200) {
        this.setState(() => {
          return {
            pickDataAll: res.data.body
          }
        }, () => {
          // console.log(this.state.pickDataAll)
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
  setMore = () => {
    const { pickerOpen, pickDataAll: { characteristic, floor, oriented, roomType } } = this.state
    const dataDetail = {
      characteristic,
      floor,
      oriented,
      roomType
    }
    if (pickerOpen === "more") {
      return <FilterMore type={pickerOpen} moreCancel={this.onCancel} moreSave={this.onSave} dataDetail={dataDetail} />
    } else {
      return null
    }
  }
  componentDidMount() {
    this.getDistrict();
    this.bodyDom = window.document.body;
  }
  render() {
    const { activeList, pickerOpen } = this.state;
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {(pickerOpen === "area" || pickerOpen === "mode" || pickerOpen === "price") && <div className={styles.mask} onClick={() => { this.onCancel(pickerOpen) }} />}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle active={activeList} activeClick={this.setActive} />

          {/* 前三个菜单对应的内容： */}
          {this.setPicker()}

          {/* 最后一个菜单对应的内容： */}
          {this.setMore()}
        </div>
      </div>
    )
  }
}
