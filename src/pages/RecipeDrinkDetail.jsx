import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDrinks } from '../services/api';

function RecipeDrinkDetail() {
  const [drink, setDrink] = useState([]);
  const [video, setVideo] = useState('');
  const { id } = useParams();

  async function chamadaDrink() {
    const d = await getDrinks(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    setDrink(d[0]);
    console.log(d[0]);
    setVideo(d[0].strVideo);
  }

  useEffect(() => {
    chamadaDrink();
  }, []);

  function createIngredients() {
    const ingredientValues = Object.values(drink).filter(
      (e, i) => (Object.keys(drink)[i].includes('Ingredient')),
    );

    const measureValues = Object.values(drink).filter(
      (e, i) => (Object.keys(drink)[i].includes('Measure')),
    );

    const ingredients = ingredientValues.map((e, i) => {
      if (e !== '' && e !== null) {
        const ingredient = (
          <p data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
            {`${e}, ${measureValues[i]} `}
          </p>
        );
        return ingredient;
      }
      return ('');
    });
    return ingredients;
  }

  function getId() {
    if (video === null) {
      return video;
    }
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = video.match(regExp);
    const length = 11;

    return (match && match[2].length === length)
      ? match[2]
      : null;
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
      />);

    return iframeMarkup;
  }

  return (
    <div>
      <img
        src={ drink.strDrinkThumb }
        data-testid="recipe-photo"
        alt="thumb"
        width="200px"
      />
      <h1 data-testid="recipe-title">{drink.strDrink}</h1>
      <h4 data-testid="recipe-category">{drink.strAlcoholic}</h4>
      { createIngredients() }
      <p data-testid="instructions">{drink.strInstructions}</p>
      { createVideo() }
    </div>
  );
}

export default RecipeDrinkDetail;
