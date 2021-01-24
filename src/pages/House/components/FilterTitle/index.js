import React from 'react'

import { Flex } from 'antd-mobile'

import styles from './index.module.css'

// 条件筛选栏标题数组：
const titleList = [
  { title: '区域', type: 'area' },
  { title: '方式', type: 'mode' },
  { title: '租金', type: 'price' },
  { title: '筛选', type: 'more' }
]

export default function FilterTitle(props) {
  let { active, activeClick } = props;
  const setItem = () => {
    return titleList.map(item => {
      return <Flex.Item key={item.type}>
        {/* 选中类名： selected */}
        <span
          className={[styles.dropdown,
            active[item.type] ? styles.selected
            : ""
          ].join(' ')}
          onClick={() => {
            activeClick(item.type);
          }}
        >
          <span>{item.title}</span>
          <i className="iconfont icon-arrow" />
        </span>
      </Flex.Item>
    })
  }
  return (
    <Flex align="center" className={styles.root}>
      { setItem()}
    </Flex>
  )
}
