import React from 'react'
import { observer } from 'mobx-react'
import { Route, Switch } from 'react-router-dom'
import Weather from '../Main'

const PrivatePages: React.FC = observer(() => {
  return (
    <Switch>
      <Route exact path="/" component={Weather} />
    </Switch>
  )
})

export default PrivatePages
