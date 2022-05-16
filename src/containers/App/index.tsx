import React, { Suspense, useEffect, useState } from 'react'
import { Router, Switch } from 'react-router'
import store, { StoreContext } from 'stores'

//components
import SignIn from 'containers/Public/SignIn'
import SignUp from 'containers/Public/SignUp'
import PrivatePages from 'containers/Private/PageRoutes'
import history from 'utils/history'
import PublicRoute from 'components/PublicRoute'
import PrivateRoute from 'components/PrivateRoute'
//utils
import { login } from 'utils/login'
import { Spin } from 'antd'

const App = () => {
  const [initialized, setInitialized] = useState<boolean>(false)
  const get = async () => {
    try {
      await login('test_JWT')
    } finally {
      setInitialized(true)
    }
  }
  useEffect(() => {
    //do smth with token logic
    //if !token u will be redirected to LOGIN page
    get()
  }, [])

  return (
    <Suspense fallback={<Spin size="large" />}>
      <StoreContext.Provider value={store}>
        {initialized ? (
          <Router history={history}>
            <Switch>
              <PublicRoute restricted={true} component={SignIn} path="/login" exact />
              <PublicRoute restricted={true} component={SignUp} path="/register" exact />
              <PrivateRoute component={PrivatePages} path="/" />
            </Switch>
          </Router>
        ) : (
          <Spin size="large" />
        )}
      </StoreContext.Provider>
    </Suspense>
  )
}

export default App
