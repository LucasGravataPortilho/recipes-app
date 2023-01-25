import React from 'react';
import DrinkIcon from '../images/drinkIcon.svg';
import MealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <button type="button" onClick={ () => console.log('drink') }>
        <img src={ DrinkIcon } alt="drink" />
      </button>
      <button type="button" onClick={ () => console.log('meal') }>
        <img src={ MealIcon } alt="meal" />
      </button>
    </footer>
  );
}

export default Footer;
