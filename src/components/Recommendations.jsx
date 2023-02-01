import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

function Recomendations({ type }) {
  const [key, setKey] = useState('');
  const [capital, setCapital] = useState('');
  const [url, setUrl] = useState('');
  const [recipe, setRecipe] = useState([]);

  const requisicaoAPI = useCallback(async () => {
    if (url !== '') {
      try {
        const numberItens = 6;
        const response = await fetch(url);
        const json = await response.json();
        setRecipe(json[key].slice(0, numberItens));
      } catch (e) {
        console.log(e);
      }
    }
  }, [url, key]);

  const setVariables = useCallback(() => {
    if (type === 'meals') {
      setKey('drinks');
      setCapital('Drink');
      setUrl('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    } else if (type === 'drinks') {
      setKey('meals');
      setCapital('Meal');
      setUrl('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    }
  }, [type]);

  useEffect(() => {
    setVariables();
    requisicaoAPI();
  });

  const recipeList = () => {
    const items = recipe.map((e, i) => {
      const item = (
        <div key={ i } data-testid={ `${i}-recommendation-card` }>
          <img
            src={ e[`str${capital}Thumb`] }
            alt="First slide"
          />
          <h3 data-testid={ `${i}-recommendation-title` }>{e[`str${capital}`]}</h3>
        </div>
      );
      return item;
    });

    return items;
  };

  return (

    <div>
      <h2>Recomendations</h2>
      <div
        className="container"
      >
        {recipeList()}
      </div>
      <button
        type="button"
        data-testid="share-btn"
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

  );
}

Recomendations.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default Recomendations;
