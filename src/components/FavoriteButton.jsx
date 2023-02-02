import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NotFavorite from '../images/whiteHeartIcon.svg';
import Favorite from '../images/blackHeartIcon.svg';

function FavoriteButton({ receita, capital }) {
  const [fav, setFav] = useState(false);
  const [lsAtual, setLS] = useState([]);

  useEffect(() => {
    const oldLS = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (oldLS === null) {
      const newLS = [];
      setLS(newLS);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newLS));
    } else {
      oldLS.forEach((e) => {
        if (e.id === receita[`id${capital}`]) setFav(true);
      });
      setLS(oldLS);
    }
  }, [receita, capital]);

  function favoriteClick() {
    if (fav) {
      const remove = lsAtual.filter((e) => e.id !== receita[`id${capital}`]);
      setLS(remove);
      localStorage.setItem('favoriteRecipes', JSON.stringify(remove));
    } else {
      let newFavorite;
      if (capital === 'Drink') {
        newFavorite = {
          id: receita.idDrink,
          type: 'drink',
          nationality: '',
          category: receita.strCategory,
          alcoholicOrNot: receita.strAlcoholic,
          name: receita.strDrink,
          image: receita.strDrinkThumb,
        };
      } else if (capital === 'Meal') {
        newFavorite = {
          id: receita.idMeal,
          type: 'meal',
          nationality: receita.strArea,
          category: receita.strCategory,
          alcoholicOrNot: '',
          name: receita.strMeal,
          image: receita.strMealThumb,
        };
      }
      lsAtual.push(newFavorite);
      setLS(lsAtual);
      localStorage.setItem('favoriteRecipes', JSON.stringify(lsAtual));
    }
    setFav(!fav);
  }

  return (
    <input
      type="image"
      alt="favorite"
      data-testid="favorite-btn"
      onClick={ favoriteClick }
      src={ (fav) ? Favorite : NotFavorite }
    />
  );
}

FavoriteButton.propTypes = {
  receita: PropTypes.shape(),
  capital: PropTypes.shape(),
}.isRequired;

export default FavoriteButton;
