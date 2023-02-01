import { useEffect, useState, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom/cjs/react-router-dom';
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

  function getId() {
    if (video === null || video === undefined) {
      return video;
    }
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = video.match(regExp);
    const length = 11;

    return match && match[2].length === length ? match[2] : null;
  }

  function createVideo() {
    const videoId = getId();
    const iframeMarkup = (
      <iframe
        title="youtube"
        data-testid="video"
        width="300"
        height="270"
        src={ `//www.youtube.com/embed/${videoId}` }
      />
    );

    return iframeMarkup;
  }

  function toClipBoard({ target }) {
    const link = `http://localhost:3000/${key}/${id}`;
    navigator.clipboard.writeText(link);
    target.innerHTML = 'Link copied!';
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
      <Link
        to={
          `/${key === 'drinks' ? 'drinks' : 'meals'}/${id}/in-progress`
        }
      >
        <button className="start" data-testid="start-recipe-btn">
          {isInProgress() ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      </Link>
      <div className="buttons">
        <button
          type="button"
          data-testid="share-btn"
          onClick={ toClipBoard }
        >
          Compartilhar
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          Favoritar
        </button>
      </div>
    </div>
  );
}

export default RecipeDetails;
