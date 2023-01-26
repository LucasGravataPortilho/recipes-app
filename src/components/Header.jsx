import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import './Header.css';
import SearchBar from './SearchBar';

function Header({ title }) {
  const [searchBar, setBar] = useState(false);
  const [botaoDisponivel, setBotao] = useState();
  const history = useHistory();

  useEffect(() => {
    if (title === 'Profile' || title === 'Done Recipes' || title === 'Favorite Recipes') {
      setBotao(false);
    } else {
      setBotao(true);
    }
  }, [title]);

  function profileRedirect() {
    history.push('/profile');
  }

  return (

    <header className="fullHeader">

      <button type="button" onClick={ profileRedirect } id="profile">
        <img src={ ProfileIcon } alt="React Logo" data-testid="profile-top-btn" />
      </button>
      <h2 data-testid="page-title">{title}</h2>
      {(botaoDisponivel) ? (
        <button type="button" onClick={ () => setBar(!searchBar) }>
          <img src={ SearchIcon } alt="React Logo" data-testid="search-top-btn" />
        </button>) : ('')}

      {(searchBar) ? (<input type="text" data-testid="search-input" />) : ('')}
      <SearchBar />
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
