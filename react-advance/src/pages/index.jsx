import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './login'
import Home from './home'

class Index extends Component {
  state = {  }
  render() { 
    return ( 
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/login" component={Login}></Route>
          <Route exact path="/posts" component={Home}></Route>
          <Route path="/posts/:id" component={Home}></Route>
        </Switch>
      </Router>
    );
  }
}
 
export default Index;