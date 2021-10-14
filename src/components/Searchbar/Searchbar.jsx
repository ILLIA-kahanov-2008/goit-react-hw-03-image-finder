import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import styles from './Searchbar.module.css'

class SearchBar extends Component {
  state = {
    query:'',
}

   handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { query} = this.state;
    console.log('Submit :>> ', query);

     if (query.trim() === '') {
      alert('Enter query');
      return;
    }

    this.props.onSubmit(query);
    this.setState({ query: '' });
  };

  componentDidMount() {

  }

 
  componentDidUpdate(prevProps, prevState) {

  }

  componentWillUnmount() {

  }

  render() {
    const {query} = this.state
    const {handleSubmit, handleChange} = this
    return (
      <header className={styles.SearchBar}>
        <form className={styles.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={styles.SearchFormBtn}>
            <span className={styles.SearchFormBtnLabel}>Search</span>
          </button>
          <input
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            name="query"
            onChange={handleChange}
          />
        </form>
      </header>
    );
  }
}

// SearchBar.propTypes = {

// };

export default SearchBar;

