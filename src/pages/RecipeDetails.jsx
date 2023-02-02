import { useEffect, useState, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom/cjs/react-router-dom';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import Recomendations from '../components/Recommendations';
import '../components/Recommendations.css';
import './RecipeDetails.css';

function RecipeDetails() {
  const [key, setKey] = useState();
  const [capitalKey, setCapital] = useState();
  const [id, setId] = useState();
  const [url, setUrl] = useState('');
  const [recipe, setRecipe] = useState('');
  const [video, setVideo] = useState('');
  const location = useLocation();

  const setVariables = useCallback(() => {
    const path = location.pathname.split('/');
    setKey(path[1]);
    setId(path[2]);

    if (path[1] === 'meals') {
      setUrl(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      setCapital('Meal');
      setVideo(path[1].strYoutube);
    } else {
      setCapital('Drink');
      setUrl(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      setVideo(path[1].strVideo);
    }
  }, [id, location]);

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

  function isInProgress() {
    const path = location.pathname.split('/');
    const type = path[1];
    const pathId = path[2];

    let inProgress = false;
    const inProgressRecipes = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    );
    if (inProgressRecipes) {
      Object.keys(inProgressRecipes[type]).forEach((crrId) => {
        if (crrId === pathId) {
          inProgress = true;
        }
      });
    }

    return inProgress;
  }

  function createIngredients() {
    const ingredientValues = Object.values(recipe).filter((e, i) => Object
      .keys(recipe)[i]
      .includes('Ingredient'));

    const measureValues = Object.values(recipe).filter((e, i) => Object
      .keys(recipe)[i]
      .includes('Measure'));

    const ingredients = ingredientValues.map((e, i) => {
      if (e !== '' && e !== null) {
        const ingredient = (
          <p data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
            {`${e}, ${measureValues[i]} `}
          </p>
        );
        return ingredient;
      }
      return '';
    });
    return ingredients;
  }

  function createVideo() {
    const iframeMarkup = (
      <iframe
        title="youtube"
        data-testid="video"
        width="300"
        height="270"
        src={ `//www.youtube.com/embed/${video}` }
      />
    );

    return iframeMarkup;
  }

  return (
    <div>
      <img
        alt="recipe"
        data-testid="recipe-photo"
        width="200px"
        src={ recipe[`str${capitalKey}Thumb`] }
      />
      <h1 data-testid="recipe-title">{recipe[`str${capitalKey}`]}</h1>
      <h4 data-testid="recipe-category">
        {key === 'meals' ? recipe.strCategory : recipe.strAlcoholic}
      </h4>
      {createIngredients()}
      <p data-testid="instructions">{recipe.strInstructions}</p>
      {createVideo()}
      <Recomendations type={ key } />
      <div className="padding" />
      <Link to={ `/${key === 'drinks' ? 'drinks' : 'meals'}/${id}/in-progress` }>
        <button className="start" data-testid="start-recipe-btn">
          {isInProgress() ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      </Link>
      <div className="buttons">
        <ShareButton type={ key } identificacao={ id } />
        <FavoriteButton receita={ recipe } capital={ capitalKey } />
      </div>
    </div>
  );
}
// teste
export default RecipeDetails;
