import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class ListMyBooks extends Component {

    constructor(props){
        super(props);
        this.state = {
            mybooksData: props.mybooksData
         }
    }
    // state = {
    //     mybooksData: []
    // }
    componentWillReceiveProps(nextProps) {
        this.setState({
            mybooksData: nextProps.mybooksData
          });
    }
    setShelf(bookId,status) {
        console.log("执行更新status...");
        this.state.mybooksData.filter(book => book.id === bookId).forEach(el => {el.shelf = status});
        console.log(this.state.mybooksData);
        this.setState({
            mybooksData: this.state.mybooksData
        });
    }
    render() {
        // const {readingData, wantData, readData} = this.props;
        //const {mybooksData} = this.props;
        //....
        //..
        return (
          <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {  
                    // readingData && readingData.length > 0 && readingData.map((book) => (
                    //     <li key={book.id}>
                    //         <Book data={book} />
                    //     </li>
                    // ))
                    this.state.mybooksData && this.state.mybooksData.length > 0 && this.state.mybooksData.filter(book => book.shelf === 'currentlyReading').map((book) => (
                            <li key={book.id}>
                                <Book data={book} onShelfChange={(bookId, status) => {this.setShelf(bookId, status);}} />
                            </li>
                        ))
                    }
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                  {  
                    // wantData && wantData.length > 0 && wantData.map((book) => (
                    //     <li key={book.id}>
                    //         <Book data={book} />
                    //     </li>
                    // ))
                    this.state.mybooksData && this.state.mybooksData.length > 0 && this.state.mybooksData.filter(book => book.shelf === 'wantToRead').map((book) => (
                        <li key={book.id}>
                            <Book data={book} onShelfChange={(bookId, status) => {this.setShelf(bookId, status);}} />
                        </li>
                    ))
                }
                    
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                  {  
                    // readData && readData.length > 0 && readData.map((book) => (
                    //     <li key={book.id}>
                    //         <Book data={book} />
                    //     </li>
                    // ))
                    this.state.mybooksData && this.state.mybooksData.length > 0 && this.state.mybooksData.filter(book => book.shelf === 'read').map((book) => (
                        <li key={book.id}>
                            <Book data={book} onShelfChange={(bookId, status) => {this.setShelf(bookId, status);}} />
                        </li>
                    ))
                    }
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">
                    Add a book
            </Link>
          </div>
           
        </div>
            
        )
    }
}


export default ListMyBooks;
