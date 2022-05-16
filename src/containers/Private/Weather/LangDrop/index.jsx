import React, { useState } from 'react'
import 'antd/dist/antd.css'
import { Menu, Dropdown, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import 'utils/i18n'
import Globe from '../Globe'
import citys from '../store/citys'
import styles from './styles.module.scss'

const LangDrop = () => {
  const [langLabel, setLabel] = useState(() => {
    return JSON.parse(localStorage.getItem('lang-label')) || 'EN'
  })
  const [arrow, setArrow] = useState(false)
  const { i18n } = useTranslation()
  const changeLanguage = lang => {
    i18n.changeLanguage(lang)
  }

  const menu = (
    <Menu
      items={[
        {
          label: 'EN',
          key: '0',
          onClick: event => {
            setLabel(event.domEvent.currentTarget.innerText)
            changeLanguage('en')
            citys.setLanguage(false)
            citys.setLabel(event.domEvent.currentTarget.innerText)
          },
        },
        {
          label: 'UA',
          key: '1',
          onClick: event => {
            setLabel(event.domEvent.currentTarget.innerText)
            changeLanguage('ua')
            citys.setLanguage(false)
            citys.setLabel(event.domEvent.currentTarget.innerText)
          },
        },
        {
          label: 'HE',
          key: '3',
          onClick: event => {
            setLabel(event.domEvent.currentTarget.innerText)
            changeLanguage('he')
            citys.setLanguage(true)
            citys.setLabel(event.domEvent.currentTarget.innerText)
          },
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
          {langLabel}
          <div className={arrow ? styles.arrowUp : styles.arrowDown}>
            <DownOutlined />
          </div>
        </Space>
      </span>
    </Dropdown>
  )
}

export default LangDrop
