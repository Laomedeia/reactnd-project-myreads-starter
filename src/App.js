import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListMyBooks from './ListMyBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    // reading_books: [],
    // want_books: [],
    // read_books: [],
    mybooks: []
}
componentDidMount() {
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
            // <SearchBooks mybooksData={this.state.reading_books.concat(this.state.want_books).concat(this.state.read_books)} />
            <SearchBooks mybooksData={this.state.mybooks} onMarkBook={()=>{history.push("/")}} />
        )} ></Route>  
        <Route exact path="/" render={() => (
          //  <ListMyBooks readingData={this.state.reading_books} wantData={this.state.want_books} readData={this.state.read_books} />
          <ListMyBooks mybooksData={this.state.mybooks} />
        )}></Route>
      </div>
    )
  }
}

export default BooksApp
