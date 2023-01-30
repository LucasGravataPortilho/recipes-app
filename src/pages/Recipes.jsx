import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import './Recipes.css';
import RecipedCategoryButtons from '../components/RecipesCategoryButtons';

function Recipes() {
  const [key, setKey] = useState('');
  const [capital, setCapital] = useState('');
  const [urlGeral, setUrlGeral] = useState('');
  const [recipes, setRecipes] = useState([]);
  const location = useLocation();
  const history = useHistory();

  const getR = useCallback(async (url) => {
    if (url !== '') {
      const response = await fetch(url);
      const json = await response.json();
      setRecipes(json[key]);
    }
  }, [key]);

  const setVariables = useCallback(async () => {
    setKey(location.pathname.split('/')[1]);

    if (key === 'meals') {
      setUrlGeral('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setCapital('Meal');
    } else if (key === 'drinks') {
      setUrlGeral('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      setCapital('Drink');
    }

    getR(urlGeral);
  }, [key, location, getR, urlGeral]);

  useEffect(() => {
    setVariables();
  }, [setVariables]);

  const searchR = useCallback(async (url) => {
    const response = await fetch(url);
    const json = await response.json();

    if (json[key] === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (json[key].length === 1) {
      if (key === 'meals') {
        history.push(`/meals/${json[key][0].idMeal}`);
      } else {
        history.push(`/drinks/${json[key][0].idDrink}`);
      }
    } else {
      setRecipes(json[key]);
    }
  }, [history, key]);

  const valor = useMemo(
    () => ({
      key,
      recipes,
      getR,
      urlGeral,
      searchR,
    }),
    [recipes, getR, key, urlGeral, searchR],
  );

  function makeCards() {
    const maximo = 12;
    const dozeReceitas = recipes.slice(0, maximo);
    const cards = dozeReceitas.map((receita, index) => {
      const card = (
        <Link to={ `/${key}/${receita[`id${capital}`]}` } key={ index }>
          <div
            className="card"
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ (receita[`str${capital}Thumb`]) }
              alt="thumb"
              data-testid={ `${index}-card-img` }
              width="75px"
            />
            <p data-testid={ `${index}-card-name` }>
              {receita[`str${capital}`]}
            </p>
          </div>
        </Link>
      );
      return card;
    });
    return cards;
  }

  return (
    <RecipesContext.Provider
      value={ valor }
    >
      <div>
        <Header title={ `${capital}s` } />
        <div>
          <RecipedCategoryButtons />
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ () => getR(urlGeral) }
          >
            All
          </button>
        </div>
        <div className="AllCards">
          {makeCards()}
        </div>
        <Footer />
      </div>
    </RecipesContext.Provider>
  );
}

export default Recipes;
