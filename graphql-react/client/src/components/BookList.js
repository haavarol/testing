import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import {getBooksQuery} from '../queries/queries'

class BookList extends Component {

  displayBook(){
    let {data} = this.props;
    if (data.loading){
      return(<div>Loading books...</div>);
    } else {
      return data.books.map(book => {
        return(
          <li key={book.id}>{book.name}</li>
        )
      })
    }
  }
  
  render(){
  return(
    <div>
      <ul id="book-list">
        {this.displayBook()}
      </ul>
    </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);