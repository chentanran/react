import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom'
import Posts from './posts'
import { createHashHistory } from 'history'
import PostsDetail from './posts-detail'
const history = createHashHistory()
class Home extends Component {
  state = {  }

  handleClick() {
    history.push('/娃哈哈')
  }
  render() {
    console.log(this.props)
    const { match, location }  = this.props
    return (
      <div>
        <div>home</div>
          <div onClick={this.handleClick.bind(this)}>哇哈哈真好喝</div>
          <Route exact path={match.url} 
            render={props => <Posts></Posts>}
          ></Route>
          <Route path="/posts/:id" component={PostsDetail}></Route>
      </div>
      
    );
  }
}
 
export default Home;