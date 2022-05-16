import React from 'react'
import { observer } from 'mobx-react'
import { Route, Switch } from 'react-router-dom'
import Weather from '../Weather'
// import Main from '../Main'

const PrivatePages: React.FC = observer(() => {
  return (
    <Switch>
      <Route exact path="/" component={Weather} />
      {/* <Redirect from="/" to={} /> */}
    </Switch>
  )
})

export default PrivatePages
