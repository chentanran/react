import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Echarts from './components/echarts'
import Pie1 from './components/pie1'
import Line1 from './components/line1'
// import Transition from './components/pie3'

const router = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/nav1" component={Echarts}></Route>
        <Route path="/nav2" component={Pie1}></Route>
        <Route path="/line1" component={Line1}></Route>
        {/* <Route path="/nav3" component={Transition}></Route> */}
      </Switch>
    </HashRouter>  
  )
}

export default router
