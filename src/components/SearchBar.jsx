import React, { useState } from 'react';
import { getDrinks } from '../services/api';

function SearchBar() {
  const [inputSearch, setinputSearch] = useState('');

  // const fetchIngredientAPI = async () => {
  //   const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`);
  //   const result = await response.json();
  //   console.log(result);
  //   return result;
  // };
  // const fetchNameAPI = async () => {
  //   const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch}`);
  //   const result = await response.json();
  //   console.log(result);
  //   return result;
  // };
  // const fetchFirstLetterAPI = async () => {
  //   const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputSearch}`);
  //   const result = await response.json();
  //   console.log(result);
  //   return result;
  // };

  const handleChange = ({ target }) => {
    setinputSearch(target.value);
  };

  const handleButtonSearch = async () => {
    if (document.getElementById('ingredient').checked) {
      try {
        // fetchIngredientAPI();
        await getDrinks(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputSearch}`);
      } catch (error) {
        global.alert('ingrediente não existe');
      }
    } else if (document.getElementById('name').checked) {
      // fetchNameAPI();
      getDrinks(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch}`);
    } else if (document.getElementById('first-letter').checked) {
      if (inputSearch.length === 1) {
        // fetchFirstLetterAPI();
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
