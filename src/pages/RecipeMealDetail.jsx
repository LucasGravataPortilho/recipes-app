import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMeals } from '../services/api';

function RecipeMealDetail() {
  const [meal, setMeal] = useState([]);
  const [video, setVideo] = useState('');
  const { id } = useParams();

  useEffect(() => {
    async function chamadaMeal() {
      const m = await getMeals(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      setMeal(m[0]);
      setVideo(m[0].strYoutube);
    }

    chamadaMeal();
  }, [id]);

  function createIngredients() {
    const ingredientValues = Object.values(meal).filter(
      (e, i) => (Object.keys(meal)[i].includes('Ingredient')),
    );

    const measureValues = Object.values(meal).filter(
      (e, i) => (Object.keys(meal)[i].includes('Measure')),
    );

    console.log(meal);
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
        src={ meal.strMealThumb }
        data-testid="recipe-photo"
        alt="thumb"
        width="200px"
      />
      <h1 data-testid="recipe-title">{meal.strMeal}</h1>
      <h4 data-testid="recipe-category">{meal.strCategory}</h4>
      { createIngredients() }
      <p data-testid="instructions">{meal.strInstructions}</p>
      { createVideo() }

    </div>
  );
}

export default RecipeMealDetail;
