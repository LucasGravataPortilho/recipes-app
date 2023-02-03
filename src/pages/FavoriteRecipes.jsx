import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Share from '../images/shareIcon.svg';
import Favorite from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [copied, setCopied] = useState(false);

  function toClipboard({ target }) {
    const { value, id } = target;
    const link = `http://localhost:3000/${id}s/${value}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
  }

  useEffect(() => {
    const lsAtual = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (lsAtual !== null) {
      setRecipes(lsAtual);
      setAllRecipes(lsAtual);
    }
  }, []);

  function favoriteClick({ target }) {
    const { id } = target;
    const removeR = recipes.filter((e) => e.id !== id);
    const removeA = allRecipes.filter((e) => e.id !== id);

    setRecipes(removeR);
    setAllRecipes(removeA);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeA));
  }

  function createCards() {
    const cards = recipes.map((e, i) => {
      const card = (
        <div key={ i }>
          <Link to={ `/${e.type}s/${e.id}` }>
            <img
              alt={ e.name }
              src={ e.image }
              data-testid={ `${i}-horizontal-image` }
              width="60px"
            />
            <h3 data-testid={ `${i}-horizontal-name` }>{e.name}</h3>
          </Link>
          <p data-testid={ `${i}-horizontal-top-text` }>
            {(e.type === 'meal') ? (`${e.nationality} - ${e.category}`)
              : (e.alcoholicOrNot)}
          </p>
          <input
            type="image"
            alt="favorite"
            value={ e.id }
            id={ e.type }
            data-testid={ `${i}-horizontal-share-btn` }
            onClick={ toClipboard }
            src={ Share }
          />
          <div />
          <input
            type="image"
            alt="favorite"
            id={ e.id }
            data-testid={ `${i}-horizontal-favorite-btn` }
            onClick={ favoriteClick }
            src={ Favorite }
          />
        </div>
      );
      return card;
    });

    return cards;
  }

  function filterType({ target }) {
    const { value } = target;
    const filtro = allRecipes.filter((e) => e.type === value);
    setRecipes(filtro);
  }

  function clearFilter() {
    setRecipes(allRecipes);
  }

  return (
    <div>
      <Header title="Favorite Recipes" />
      <button data-testid="filter-by-all-btn" onClick={ clearFilter }>All</button>
      <button value="meal" data-testid="filter-by-meal-btn" onClick={ filterType }>
        Meals
      </button>
      <button value="drink" data-testid="filter-by-drink-btn" onClick={ filterType }>
        Drinks
      </button>
      {(copied) ? (<p>Link copied!</p>) : ('')}
      <div>
        {createCards()}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
