import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMeals } from '../services/api';

function Meals() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filtro, setFiltro] = useState('');

  async function chamadasMeal() {
    const comida = await getMeals('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    setRecipes(comida);
  }

  async function chamadasCategoria() {
    const cat = await getMeals('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    setCategories(cat);
  }

  useEffect(() => {
    chamadasMeal();
    chamadasCategoria();
  }, []);

  function makeCards() {
    const maximo = 12;
    const dozeReceitas = recipes.slice(0, maximo);
    const cards = dozeReceitas.map((receita, index) => {
      const card = (
        <Link to={ `/meals/${receita.idMeal}` } key={ index }>
          <div
            className="card"
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ (receita.strMealThumb) }
              alt="thumb"
              data-testid={ `${index}-card-img` }
              width="75px"
            />
            <p data-testid={ `${index}-card-name` }>
              {receita.strMeal}
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
      chamadasMeal();
      setFiltro('');
    } else {
      const data = await getMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${target.value}`);
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
          key={ i }
          value={ strCategory }
          onClick={ categoryList }
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
          onClick={ chamadasMeal }
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

export default Meals;
