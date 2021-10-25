import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './SearchBar.module.css'

class SearchBar extends Component {
  state = {
    query:'',
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    const pageNumber = 1;    
    e.preventDefault();
    const { query } = this.state;
    if (query.trim() === '') {
      alert('Enter query before submit');
      return;
    }
    this.props.onSubmit(query, pageNumber);
    this.setState({ query: '' });
  };

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

SearchBar.propTypes = {
 onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;

