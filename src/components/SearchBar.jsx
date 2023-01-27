import React, { useState } from 'react';
import { getDrinks, getMeals } from '../services/api';

function SearchBar() {
  const [inputSearch, setinputSearch] = useState('');

  const handleChange = ({ target }) => {
    setinputSearch(target.value);
  };

  const handleButtonSearch = async () => {
    if (document.getElementById('ingredient').checked) {
      try {
        await getMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`);
        await getDrinks(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputSearch}`);
      } catch (error) {
        global.alert('ingrediente não existe');
      }
    } else if (document.getElementById('name').checked) {
      getMeals(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch}`);
      getDrinks(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch}`);
    } else if (document.getElementById('first-letter').checked) {
      if (inputSearch.length === 1) {
        getMeals(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputSearch}`);
        getDrinks(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputSearch}`);
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
    }
  };

  return (
    <>
      <div>
        <input
          type="text"
          data-testid="search-input"
          placeholder="Search"
          value={ inputSearch }
          onChange={ handleChange }
        />
        <input
          type="radio"
          id="ingredient"
          data-testid="ingredient-search-radio"
          name="button"

        />
        Ingredient
        <input
          type="radio"
          id="name"
          data-testid="name-search-radio"
          name="button"
        />
        Name
        <input
          type="radio"
          id="first-letter"
          data-testid="first-letter-search-radio"
          name="button"
        />
        First letter
      </div>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleButtonSearch }
      >
        Buscar
      </button>
    </>
  );
}

export default SearchBar;
