import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import Checkboxes from '../components/Checkboxes';
import './RecipeinProgress.css';

function RecipeInProgress() {
  const [key, setKey] = useState();
  const [capitalKey, setCapital] = useState();
  const [id, setId] = useState();
  const [url, setUrl] = useState('');
  const [recipe, setRecipe] = useState({});
  const location = useLocation();

  const setVariables = useCallback(() => {
    const path = location.pathname.split('/');
    setKey(path[1]);
    setId(path[2]);
    setCapital(path[1].charAt(0).toUpperCase() + path[1].slice(1, path[1].length - 1));

    if (key === 'meals') {
      setUrl(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    } else {
      setUrl(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    }
  }, [id, key, location]);

  const requisicaoAPI = useCallback(async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setRecipe(json[key][0]);
    } catch (e) {
      console.log(e);
    }
  }, [url, key]);

  useEffect(() => {
    setVariables();
    requisicaoAPI();
  }, [setVariables, requisicaoAPI]);

  return (
    <div>
      <img
        alt="recipe"
        data-testid="recipe-photo"
        width="150px"
        src={ recipe[`str${capitalKey}Thumb`] }
      />
      <h1 data-testid="recipe-title">{recipe[`str${capitalKey}`]}</h1>
      <button type="button" data-testid="share-btn">Share</button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
      <h3 data-testid="recipe-category">{recipe.strCategory}</h3>
      <Checkboxes obj={ recipe } />
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <button type="button" data-testid="finish-recipe-btn">Finish</button>
    </div>
  );
}

export default RecipeInProgress;
