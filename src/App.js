import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListMyBooks from './ListMyBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    mybooks: []
  }
componentDidMount() {
    // 查询我的图书
    BooksAPI.getAll().then((books) => {
        console.log(books);
        this.setState(state => ({
          mybooks: books
        }))
    })
}   

  render() {
    return (
      <div className="app">
       <Route path="/search" render={({history}) => (
            <SearchBooks mybooksData={this.state.mybooks}  />
        )} ></Route>  
        <Route exact path="/" render={() => (
            <ListMyBooks mybooksData={this.state.mybooks} />
        )}></Route>
      </div>
    )
  }
}

export default BooksApp
