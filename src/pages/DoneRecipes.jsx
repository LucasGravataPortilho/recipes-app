import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Share from '../images/shareIcon.svg';

function DoneRecipes() {
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
    const lsAtual = JSON.parse(localStorage.getItem('doneRecipes'));
    if (lsAtual !== null) {
      setRecipes(lsAtual);
      setAllRecipes(lsAtual);
    }
  }, []);

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
          <p data-testid={ `${i}-horizontal-done-date` }>
            {e.doneDate}
          </p>
          {e.tags.map((t, k) => {
            const tag = (
              <p data-testid={ `${i}-${t}-horizontal-tag` } key={ k }>
                {t}
              </p>
            );
            return tag;
          })}
          <input
            type="image"
            alt="share"
            value={ e.id }
            id={ e.type }
            data-testid={ `${i}-horizontal-share-btn` }
            onClick={ toClipboard }
            src={ Share }
          />
          <div />
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
      <Header title="Done Recipes" />
      <button data-testid="filter-by-all-btn" onClick={ clearFilter }>All</button>
      <button value="meal" data-testid="filter-by-meal-btn" onClick={ filterType }>
        Meals
      </button>
      <button value="drink" data-testid="filter-by-drink-btn" onClick={ filterType }>
        Drinks
      </button>
      {(copied) ? (<p data-testid="link-copied">Link copied!</p>) : ('')}
      <div>
        {createCards()}
      </div>
    </div>
  );
}

export default DoneRecipes;
