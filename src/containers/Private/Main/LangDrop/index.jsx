import { useState } from 'react'
import { useStore } from 'stores'
import 'antd/dist/antd.css'
import { Menu, Dropdown, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import 'utils/i18n'
import { globe } from '../Globe.js'
import styles from './styles.module.scss'

const LangDrop = () => {
  const { cityStore } = useStore()

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
            console.log(event.domEvent.currentTarget.innerText, '121212')
            changeLanguage('en')
            cityStore.setLanguage(false)
            cityStore.setLabel(event.domEvent.currentTarget.innerText)
          },
        },
        {
          label: 'UA',
          key: '1',
          onClick: event => {
            setLabel(event.domEvent.currentTarget.innerText)
            changeLanguage('ua')
            cityStore.setLanguage(false)
            cityStore.setLabel(event.domEvent.currentTarget.innerText)
          },
        },
        {
          label: 'HE',
          key: '3',
          onClick: event => {
            setLabel(event.domEvent.currentTarget.innerText)
            changeLanguage('he')
            cityStore.setLanguage(true)
            cityStore.setLabel(event.domEvent.currentTarget.innerText)
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
      <span>
        <Space>
          <span>{globe}</span>
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
