import React, { useState } from 'react'
import 'antd/dist/antd.css'
import { Menu, Dropdown, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import cn from 'classnames'
import Globe from '../Globe'
import styles from './styles.module.scss'
import classNames from 'classnames'

const LangDrop = () => {
  const [label, setLabel] = useState('EN')
  const [arrow, setArrow] = useState(false)

  const menu = (
    <Menu
      items={[
        {
          label: 'EN',
          key: '0',
          onClick: event => setLabel(event.domEvent.currentTarget.innerText),
        },
        {
          label: 'UA',
          key: '1',
          onClick: event => setLabel(event.domEvent.currentTarget.innerText),
        },
        {
          label: 'HE',
          key: '3',
          onClick: event => setLabel(event.domEvent.currentTarget.innerText),
        },
      ]}
    />
  )

  return (
    <Dropdown
      onVisibleChange={visible => {
        setArrow(visible)
      }}
      overlay={menu}
      trigger={['click']}
    >
      <span onClick={e => e.preventDefault()}>
        <Space>
          <Globe />
          {label}
          <div className={arrow ? styles.arrowUp : styles.arrowDown}>
            <DownOutlined />
          </div>
        </Space>
      </span>
    </Dropdown>
  )
}

export default LangDrop
