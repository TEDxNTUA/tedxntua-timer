import { h, render } from 'preact'
import Router from 'preact-router'
import AsyncRoute from 'preact-async-route'

import './style'


const App = () => (
  <Router>
    <AsyncRoute
      path='/timer'
      getComponent={ () => import('~/components/timer').then(m => m.default) }
    />
  </Router>
)

render(<App />, document.getElementById('app'))
