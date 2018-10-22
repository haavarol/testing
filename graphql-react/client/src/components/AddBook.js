import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'


class AddBook extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: ""
    }
  }

  //TODO: https://youtu.be/ed8SzALpx1Q?t=12911

  displayAuthors() {
    let { getAuthorsQuery } = this.props;

    if (getAuthorsQuery.loading) {
      return (<option disabled>Loading Authors...</option>)
    } else {
      return getAuthorsQuery.authors.map(({ name, id }) => {
        return (<option key={id} value={id}>{name}</option>)
      })
    }
  }

  submitForm = e => {
    e.preventDefault();    
    let { name, genre, authorId } = this.state;
    this.props.addBookMutation({
      variables: {
        name,
        genre,
        authorId
      },
      refetchQueries: [{ query: getBooksQuery}]
    });
  }

  // Handlers
  handleNameChange = name => this.setState({ name })
  handleGenreChange = genre => this.setState({ genre })
  handleAuthorChange = authorId => this.setState({ authorId })

  render() {
    return (
      <form id="add-book" onSubmit={e => this.submitForm(e)}>
        <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={e => this.handleNameChange(e.target.value)} />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={e => this.handleGenreChange(e.target.value)} />
        </div>

        <div className="field">
          <label>Author:</label>
          <select onChange={e => this.handleAuthorChange(e.target.value)}>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);