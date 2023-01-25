import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import './Header.css';

function Header({ title }) {
  const [searchBar, setBar] = useState(false);
  return (
    <header className="fullHeader">
      <button type="button" onClick={ () => console.log('profile') }>
        <img src={ ProfileIcon } alt="React Logo" data-testid="profile-top-btn" />
      </button>
      <h2 data-testid="page-title">{title}</h2>
      <button type="button" onClick={ () => setBar(!searchBar) }>
        <img src={ SearchIcon } alt="React Logo" data-testid="search-top-btn" />
      </button>
      {(searchBar) ? (<input type="text" data-testid="search-input" />) : ('')}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
