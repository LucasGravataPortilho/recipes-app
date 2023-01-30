import React from 'react';
import { useHistory } from 'react-router';
import DrinkIcon from '../images/drinkIcon.svg';
import MealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  const history = useHistory();

  function buttonRedirect(path) {
    history.push(path);
    window.location.reload();
  }

  return (
    <footer data-testid="footer">
      <button type="button" onClick={ () => buttonRedirect('/drinks') }>
        <img src={ DrinkIcon } alt="drink" data-testid="drinks-bottom-btn" />
      </button>
      <button type="button" onClick={ () => buttonRedirect('/meals') }>
        <img src={ MealIcon } alt="meal" data-testid="meals-bottom-btn" />
      </button>
    </footer>
  );
}

export default Footer;
