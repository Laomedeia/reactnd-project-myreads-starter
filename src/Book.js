import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
/**
 * @description 图书组件
 * @class Book
 * @extends {Component}
 */
class Book extends Component {
    state = { 
        my_shelf: ""
     }
    // 更新书籍状态
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
        let {my_shelf} = this.state;
        my_shelf = bookObj.data.shelf;
        return (
            <div  className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bookCover})` }}></div>
                    <div className="book-shelf-changer">
                    <select value={my_shelf}  onChange={(event) => this.updateBookStatus(event.target.value, bookObj.data)}>
                        <option value="none" disabled>移动到...</option>
                        <option value="currentlyReading">在读</option>
                        <option value="wantToRead">想读</option>
                        <option value="read">已读</option>
                        <option value="none">从书架删除</option>
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