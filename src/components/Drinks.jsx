import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDrinks } from '../services/api';

function Drinks() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filtro, setFiltro] = useState('');

  async function chamadasDrink() {
    const dr = await getDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    setRecipes(dr);
  }

  async function chamadasCategoria() {
    const cat = await getDrinks('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    setCategories(cat);
  }

  useEffect(() => {
    chamadasDrink();
    chamadasCategoria();
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
      chamadasDrink();
      setFiltro('');
    } else {
      const data = await getDrinks(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${target.value}`);
      setRecipes(data);
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
          onClick={ chamadasDrink }
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
