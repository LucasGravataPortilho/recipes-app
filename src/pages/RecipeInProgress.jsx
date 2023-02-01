import { useEffect, useState, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import Checkboxes from '../components/Checkboxes';
import FavoriteButton from '../components/FavoriteButton';
import InProgressFinishButton from '../components/InProgressFinishButton';
import CheckboxesContext from '../context/checkboxesContext';
import './RecipeinProgress.css';

function RecipeInProgress() {
  const [key, setKey] = useState();
  const [capitalKey, setCapital] = useState();
  const [id, setId] = useState();
  const [recipe, setRecipe] = useState({});
  const [allIngredients, setAllIngredients] = useState([]);
  const [usedIngredients, setingredients] = useState(['']);
  const [lsAtual, setLS] = useState({});
  const location = useLocation();

  const setIngredientsList = useCallback(() => {
    const ingredientValues = Object.values(recipe).filter(
      (e, i) => (Object.keys(recipe)[i].includes('Ingredient')),
    );
    const semVazio = ingredientValues.filter((e) => (e !== null) && (e !== ''));
    setAllIngredients(semVazio);
  }, [recipe]);

  const requisicaoAPI = useCallback(async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      await setRecipe(json[key][0]);
      setIngredientsList();
    } catch (e) {
      console.log(e);
    }
  }, [key, setIngredientsList]);

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

  const changeCheckbox = useCallback(async ({ target }) => {
    const { value } = target;
    let lista = usedIngredients;

    if (target.checked) {
      lista.push(value);
    } else {
      lista = lista.filter((e) => e !== value);
    }

    lsAtual[key][id] = lista;
    localStorage.setItem('inProgressRecipes', JSON.stringify(lsAtual));

    await setingredients(lista);
  }, [id, key, usedIngredients, lsAtual]);

  function toClipboard({ target }) {
    const link = `http://localhost:3000/${key}/${id}`;
    navigator.clipboard.writeText(link);
    target.innerHTML = 'Link copied!';
  }

  const valor = useMemo(
    () => ({
      recipe,
      allIngredients,
      usedIngredients,
      changeCheckbox,
    }),
    [recipe, allIngredients, usedIngredients, changeCheckbox],
  );

  return (
    <CheckboxesContext.Provider value={ valor }>
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
          onClick={ toClipboard }
        >
          Share
        </button>
        <FavoriteButton receita={ recipe } capital={ capitalKey } />
        <h3 data-testid="recipe-category">{recipe.strCategory}</h3>
        {(recipe !== {})
          ? (
            <Checkboxes />
          )
          : ('')}
        <p data-testid="instructions">{recipe.strInstructions}</p>
        <InProgressFinishButton />
      </div>
    </CheckboxesContext.Provider>
  );
}

export default RecipeInProgress;
