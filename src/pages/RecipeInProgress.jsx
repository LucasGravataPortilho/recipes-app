import { useEffect, useState, useCallback, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom';
import Checkboxes from '../components/Checkboxes';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import CheckboxesContext from '../context/checkboxesContext';

function RecipeInProgress() {
  const [key, setKey] = useState();
  const [capitalKey, setCapital] = useState();
  const [id, setId] = useState();
  const [recipe, setRecipe] = useState({});
  const [allIngredients, setAllIngredients] = useState([]);
  const [usedIngredients, setIngredients] = useState([]);
  const [itemsIniciais, setInicial] = useState(0);
  const [lsAtual, setLS] = useState({});
  const [finish, setFinish] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const setIngredientsList = useCallback(async () => {
    const ingredientValues = Object.values(recipe).filter(
      (e, i) => (Object.keys(recipe)[i].includes('Ingredient')),
    );
    const semVazio = ingredientValues.filter((e) => (e !== null) && (e !== ''));
    await setAllIngredients(semVazio);
    setFinish(semVazio.length === itemsIniciais);
  }, [recipe, itemsIniciais]);

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
    } else {
      url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${path[2]}`;
      setCapital('Drink');
    }

    const lsOld = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (lsOld !== null) {
      if (lsOld[path[1]][path[2]] === undefined) {
        lsOld[path[1]][path[2]] = [];
      }
      setLS(lsOld);
      setIngredients(lsOld[path[1]][path[2]]);
      setInicial(lsOld[path[1]][path[2]].length);
    } else {
      const newLS = { drinks: {}, meals: {} };
      newLS[path[1]][path[2]] = [];
      setLS(newLS);
      localStorage.setItem('inProgressRecipes', JSON.stringify(newLS));
    }

    requisicaoAPI(url);
  }, [location, requisicaoAPI]);

  const changeCheckbox = useCallback(({ target }) => {
    const { value, parentNode } = target;
    let lista = usedIngredients;

    if (target.checked) {
      parentNode.style.textDecoration = 'line-through solid rgb(0, 0, 0)';
      lista.push(value);
    } else {
      parentNode.style.textDecoration = '';
      lista = lista.filter((e) => e !== value);
    }

    lsAtual[key][id] = lista;
    localStorage.setItem('inProgressRecipes', JSON.stringify(lsAtual));

    setIngredients(lista);
    setFinish(allIngredients.length === lista.length);
  }, [id, key, usedIngredients, lsAtual, allIngredients]);

  const valor = useMemo(
    () => ({
      recipe,
      allIngredients,
      usedIngredients,
      changeCheckbox,
    }),
    [recipe, allIngredients, usedIngredients, changeCheckbox],
  );

  function finishRecipe() {
    const newRecipe = {
      id: recipe[`id${capitalKey}`],
      type: capitalKey.toLowerCase(),
      nationality: (capitalKey === 'Meal') ? (recipe.strArea) : (''),
      category: recipe.strCategory,
      alcoholicOrNot: (capitalKey === 'Meal') ? ('') : (recipe.strAlcoholic),
      name: recipe[`str${capitalKey}`],
      image: recipe[`str${capitalKey}Thumb`],
      doneDate: new Date(),
      tags: (recipe.strTags === null) ? ([]) : (recipe.strTags.split(',')),
    };

    let lsDone = JSON.parse(localStorage.getItem('doneRecipes'));
    if (lsDone === null) {
      lsDone = [];
    }

    lsDone.push(newRecipe);
    localStorage.setItem('doneRecipes', JSON.stringify(lsDone));
    history.push('/done-recipes');
  }

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
        <ShareButton type={ key } identificacao={ id } />
        <FavoriteButton receita={ recipe } capital={ capitalKey } />
        <button
          type="button"
          data-testid="finish-recipe-btn"
          onClick={ finishRecipe }
          disabled={ !finish }
        >
          Finish
        </button>
        <h3 data-testid="recipe-category">{recipe.strCategory}</h3>
        <Checkboxes />
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </div>
    </CheckboxesContext.Provider>
  );
}

export default RecipeInProgress;
