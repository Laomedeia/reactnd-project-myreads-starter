import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import { ToastContainer, toast } from 'react-toastify';
/**
 * @description 搜索书籍页面组件
 * @class SearchBooks
 * @extends {Component}
 */
class SearchBooks extends Component {

    constructor(props) {
      super(props);
      this.state = {
        books: [],
        query: ''
      }
    }
   
    // 搜索图书并保持和我的书籍状态一致
    updateQuery = (query, mybooksData) => {
      let queryCond = query.trim();
      this.setState({ query: queryCond })
      if (queryCond !== "") {
        BooksAPI.search(queryCond).then((books) => {
          if (books && books.length > 0) {
            for (const book of books) {
              mybooksData.filter(b => b.id === book.id).forEach(element => {
                book.shelf = element.shelf;
              });
            }
          }
          this.setState({ books: books });
          console.log(books);
        })
      }
    }
    setShelf(bookId,status) {
      console.log("执行更新status...");
      toast.success("✔成功添加到我的书架!")
   }
    render() {
        const { mybooksData } = this.props;
        const query = this.state.query;

        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">回到首页</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="关键词搜索" value={query} 
                       onChange={(event) => this.updateQuery(event.target.value, mybooksData)} />
                <ToastContainer autoClose={3000} />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {  
                  this.state.books && this.state.books.length > 0 && this.state.books.map((book) => (
                    <li key={book.id}>
                      <Book data={book} onShelfChange={(bookId, status) => {this.setShelf(bookId, status);}} />
                    </li>
                  ))
                 }
              </ol>
            </div>
          </div>
        )
    }
}

export default SearchBooks;