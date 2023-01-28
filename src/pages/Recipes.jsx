import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import Drinks from '../components/Drinks';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Meals from '../components/Meals';
import RecipesContext from '../context/RecipesContext';
import './Recipes.css';

function Recipes() {
  const [meal, setMeal] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    setMeal(location.pathname === '/meals');
  }, [location]);

  const searchR = useCallback(async (type, url) => {
    const response = await fetch(url);
    const json = await response.json();

    if (json[type] === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (json[type].length === 1) {
      if (meal) {
        history.push(`/meals/${json[type][0].idMeal}`);
      } else {
        history.push(`/drinks/${json[type][0].idDrink}`);
      }
    } else {
      setRecipes(json[type]);
    }
  }, [history, meal]);

  async function getR(type, url) {
    const response = await fetch(url);
    const json = await response.json();
    setRecipes(json[type]);
  }

  async function getC(type, url) {
    const response = await fetch(url);
    const json = await response.json();
    setCategories(json[type]);
  }

  const value = useMemo(
    () => ({
      recipes,
      getR,
      searchR,
      categories,
      getC,
    }),
    [recipes, categories, searchR],
  );

  return (
    <RecipesContext.Provider
      value={ value }
    >
      <div>
        <Header title={ (meal) ? ('Meals') : ('Drinks') } />
        {(meal) ? <Meals /> : <Drinks />}
        <Footer />
      </div>
    </RecipesContext.Provider>
  );
}

export default Recipes;
