import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../components/FilterFooter'

// const province = [
//   {
//     label: '北京',
//     value: '01',
//     children: [
//       {
//         label: '东城区',
//         value: '01-1'
//       },
//       {
//         label: '西城区',
//         value: '01-2'
//       },
//       {
//         label: '崇文区',
//         value: '01-3'
//       },
//       {
//         label: '宣武区',
//         value: '01-4'
//       }
//     ]
//   },
//   {
//     label: '浙江',
//     value: '02',
//     children: [
//       {
//         label: '杭州',
//         value: '02-1',
//         children: [
//           {
//             label: '西湖区',
//             value: '02-1-1'
//           },
//           {
//             label: '上城区',
//             value: '02-1-2'
//           },
//           {
//             label: '江干区',
//             value: '02-1-3'
//           },
//           {
//             label: '下城区',
//             value: '02-1-4'
//           }
//         ]
//       },
//       {
//         label: '宁波',
//         value: '02-2',
//         children: [
//           {
//             label: 'xx区',
//             value: '02-2-1'
//           },
//           {
//             label: 'yy区',
//             value: '02-2-2'
//           }
//         ]
//       },
//       {
//         label: '温州',
//         value: '02-3'
//       },
//       {
//         label: '嘉兴',
//         value: '02-4'
//       },
//       {
//         label: '湖州',
//         value: '02-5'
//       },
//       {
//         label: '绍兴',
//         value: '02-6'
//       }
//     ]
//   }
// ]

export default class FilterPicker extends Component {
  state = {
    value: this.props.pickerSelectDefault
  }
  getChange = (val) => {
    this.setState(() => {
      return {
        value: val
      }
    })
  }
  render() {
    const { onCancel, onSave, filterData, col, type } = this.props
    const { value } = this.state
    
    return (
      <>
        {/* 选择器组件： */}
        <PickerView data={filterData} value={value} onChange={this.getChange} cols={col} />
        {/* 底部按钮 */}
        <FilterFooter onCancel={() => {onCancel(type)}} onSave={() => { return onSave(value, type, 'picker') }} />
      </>
    )
  }
}
