import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import './RecipeinProgress.css';

function RecipeInProgress() {
  const [key, setKey] = useState();
  const [capitalKey, setCapital] = useState();
  const [id, setId] = useState();
  const [recipe, setRecipe] = useState({});
  const [usedIngredients, setingredients] = useState([]);
  const [lsAtual, setLS] = useState({});
  const location = useLocation();

  const requisicaoAPI = useCallback(async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setRecipe(json[key][0]);
    } catch (e) {
      console.log(e);
    }
  }, [key]);

  useEffect(() => {
    let url = '';
    const path = location.pathname.split('/');
    setKey(path[1]);
    setId(path[2]);

    if (path[1] === 'meals') {
      url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${path[2]}`;
      setCapital('Meal');
    } else if (path[1] === 'drinks') {
      url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${path[2]}`;
      setCapital('Drink');
    }

    const lsOld = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (lsOld !== null) {
      if (lsOld[path[1]][path[2]] === undefined) {
        lsOld[path[1]][path[2]] = [];
      }
      setLS(lsOld);
      setingredients(lsOld[path[1]][path[2]]);
    } else {
      const newLS = { drinks: {}, meals: {} };
      newLS[path[1]][path[2]] = [];
      setLS(newLS);
      localStorage.setItem('inProgressRecipes', JSON.stringify(newLS));
    }

    requisicaoAPI(url);
  }, [location, requisicaoAPI]);

  function changeCheckbox({ target }) {
    const { value } = target;
    let lista = usedIngredients;

    if (target.checked) {
      lista.push(value);
    } else {
      lista = lista.filter((e) => e !== value);
    }

    lsAtual[key][id] = lista;
    localStorage.setItem('inProgressRecipes', JSON.stringify(lsAtual));

    setingredients(lista);
  }

  function createIngredients() {
    const ingredientValues = Object.values(recipe).filter(
      (e, i) => (Object.keys(recipe)[i].includes('Ingredient')),
    );
    const semVazio = ingredientValues.filter((e) => (e !== null) && (e !== ''));

    const ingredients = semVazio.map((e, i) => {
      const ingredient = (
        <label
          data-testid={ `${i}-ingredient-step` }
          key={ i }
          htmlFor={ `ingredient-${i}` }
        >
          <input
            type="checkbox"
            onChange={ changeCheckbox }
            value={ e }
            defaultChecked={ usedIngredients.includes(e) }
          />
          {e}
        </label>
      );
      return ingredient;
    });
    return ingredients;
  }

  return (
    <div>
      <img
        alt="recipe"
        data-testid="recipe-photo"
        width="150px"
        src={ recipe[`str${capitalKey}Thumb`] }
      />
      <h1 data-testid="recipe-title">{recipe[`str${capitalKey}`]}</h1>
      <button
        type="button"
        onClick={ () => {
          console.log(key);
          console.log(capitalKey);
          console.log(id);
          console.log(recipe);
          console.log(lsAtual);
          console.log(usedIngredients);
        } }
      >
        Teste
      </button>
      <button
        type="button"
        data-testid="share-btn"
      >
        Share
      </button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
      <h3 data-testid="recipe-category">{recipe.strCategory}</h3>
      {(recipe !== {}) ? (createIngredients()) : ('')}
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <button type="button" data-testid="finish-recipe-btn">Finish</button>
    </div>
  );
}

export default RecipeInProgress;
