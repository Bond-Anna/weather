import React from 'react'
import { Layout } from 'antd'
import { Route, Redirect } from 'react-router-dom'
import { isLogin } from 'utils/login'

import styles from './styles.module.scss'

const PublicRoute = ({ component: Component, restricted, ...rest }: any): any => {
  return (
    <Route
      {...rest}
      render={props =>
        isLogin() && restricted ? (
          <Redirect to="/" />
        ) : (
          <Layout className={styles.layout}>
            <Layout.Content className={styles.content}>
              <Component {...props} />
            </Layout.Content>
          </Layout>
        )
      }
    />
  )
}

export default PublicRoute
