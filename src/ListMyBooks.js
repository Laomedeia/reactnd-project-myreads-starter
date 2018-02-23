import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

/**
 * @description 我的书籍列表组件
 * @class ListMyBooks
 * @extends {Component}
 */
class ListMyBooks extends Component {

    constructor(props){
        super(props);
        this.state = {
            mybooksData: props.mybooksData
         }
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            mybooksData: nextProps.mybooksData
          });
    }

    // 添加图书到指定分类书架
    setShelf(bookId,status) {
        console.log("执行更新status...");
        this.state.mybooksData.filter(book => book.id === bookId).forEach(el => {el.shelf = status});
        //console.log(this.state.mybooksData);
        this.setState({
            mybooksData: this.state.mybooksData
        });
    }

    // 根据指定分类展示图书
    listBookByStatus(status) {
      return this.state.mybooksData && this.state.mybooksData.length > 0 && this.state.mybooksData.filter(book => book.shelf === status).map((book) => (
        <li key={book.id}>
            <Book data={book} onShelfChange={(bookId, status) => {this.setShelf(bookId, status);}} />
        </li>
      ))
    }

    render() {
        return (
          <div className="list-books">
          <div className="list-books-title">
            <h1>我的书架</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">在读</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {  
                        this.listBookByStatus('currentlyReading')
                    }
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">想读</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                   {  
                        this.listBookByStatus('wantToRead')
                   }
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">已读</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                      {
                        this.listBookByStatus('read')
                      }
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">
                    添加一本书籍
            </Link>
          </div>
           
        </div>
            
        )
    }
}


export default ListMyBooks;
