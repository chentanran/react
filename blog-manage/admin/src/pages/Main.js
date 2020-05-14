import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login'
import AdminIndex from './AdminIndex'
import ArticleList from './ArticleList'
import AddArticle from './AddArticle'

function Main () {
  return (
    <Router>
      <Route path="/login/" exact component={Login}></Route>
      <Route path="/index" exact component={AdminIndex}></Route>
      <Route path="/add" exact component={AddArticle}></Route>
      <Route path="/list" exact component={ArticleList}></Route>
    </Router>
  )
}

export default Main
