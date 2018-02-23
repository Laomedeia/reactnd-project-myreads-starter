import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'

class Book extends Component {
    state = { 
        my_shelf: ""
     }
    updateBookStatus = (status, book) => {
        let _this = this;
        BooksAPI.update(book, status).then(res => {
            console.log(res)
            _this.setState(state => ({
                my_shelf: status
            }))
            _this.props.onShelfChange(book.id,status);
        });
    }
    render() {
        const bookObj = this.props;
        const bookCover = bookObj.data.imageLinks ? bookObj.data.imageLinks.thumbnail : "";
        const authers = bookObj.data.authors;
        // const shelf = bookObj.data.shelf;
        let {my_shelf} = this.state;
        my_shelf = bookObj.data.shelf;
        // this.setState(state => ({
        //     my_shelf: shelf
        // }))
        return (
            <div  className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bookCover})` }}></div>
                    <div className="book-shelf-changer">
                    <select value={my_shelf}  onChange={(event) => this.updateBookStatus(event.target.value, bookObj.data)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="none">None</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                    </select>
                    </div>
                </div>
                <div className="book-title">{bookObj.data.title}</div>
                    {
                        authers && authers.length > 0 && authers.map((auther) => (
                            <div key={auther} className="book-authors">{auther}</div>
                        ))
                    }
                </div>
        );
    }
}

export default Book;