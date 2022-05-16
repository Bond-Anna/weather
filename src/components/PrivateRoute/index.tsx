import React from 'react'

import { Route, Redirect } from 'react-router-dom'
import { isLogin } from '../../utils/login'

const PrivateRoute = ({ component: Component, ...rest }: any): any => {
  return (
    <Route
      {...rest}
      render={props => (isLogin() ? <Component {...props} /> : <Redirect to="/login" />)}
    />
  )
}

export default PrivateRoute
