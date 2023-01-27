import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function Drinks() {
  const { recipes, getR, categories, getC } = useContext(RecipesContext);
  const [filtro, setFiltro] = useState('');
  const key = 'drinks';
  const urlGeral = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const urlCategorias = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  useEffect(() => {
    getR(key, urlGeral);
    getC(key, urlCategorias);
  }, []);

  function makeCards() {
    const maximo = 12;
    const dozeReceitas = recipes.slice(0, maximo);
    const cards = dozeReceitas.map((receita, index) => {
      const card = (
        <Link to={ `/drinks/${receita.idDrink}` } key={ index }>
          <div
            data-testid={ `${index}-recipe-card` }
            className="card"
          >
            <img
              src={ (receita.strDrinkThumb) }
              alt="thumb"
              data-testid={ `${index}-card-img` }
              width="75px"
            />
            <p data-testid={ `${index}-card-name` }>
              {receita.strDrink}
            </p>
          </div>
        </Link>
      );
      return card;
    });
    return cards;
  }

  async function categoryList({ target }) {
    const { value } = target;
    if (value === filtro) {
      getR(key, urlGeral);
      setFiltro('');
    } else {
      getR(key, `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${target.value}`);
      setFiltro(value);
    }
  }

  function makeCategories() {
    const maximo = 5;
    const cincoCategorias = categories.slice(0, maximo);
    const botoes = cincoCategorias.map(({ strCategory }, i) => {
      const botao = (
        <button
          type="button"
          data-testid={ `${strCategory}-category-filter` }
          value={ strCategory }
          onClick={ categoryList }
          key={ i }
        >
          {strCategory}
        </button>
      );
      return botao;
    });
    return botoes;
  }

  return (
    <div>
      <div>
        {makeCategories()}
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => getR(key, urlGeral) }
        >
          All
        </button>
      </div>
      <div className="AllCards">
        {makeCards()}
      </div>
    </div>
  );
}

export default Drinks;
