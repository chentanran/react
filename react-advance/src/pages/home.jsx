import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Posts from './posts'
import PostsDetail from './posts-detail'

class Home extends Component {
  state = {  }
  render() {
    console.log(this.props)
    const { match, location }  = this.props
    return (
      <div>
        <div>home</div>
          <Route exact path={match.url} 
            render={props => <Posts></Posts>}
          ></Route>
          <Route path="/posts/:id" component={PostsDetail}></Route>
      </div>
      
    );
  }
}
 
export default Home;