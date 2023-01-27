import React, { useEffect, useState } from 'react';
import { getDrinks } from '../services/api';

function SearchBar() {
  const [inputSearch, setinputSearch] = useState('');

  const fetchIngredientAPI = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`);
    const result = await response.json();
    console.log(result);
    return result;
  };
  const fetchNameAPI = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch}`);
    const result = await response.json();
    console.log(result);
    return result;
  };
  const fetchFirstLetterAPI = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputSearch}`);
    const result = await response.json();
    console.log(result);
    return result;
  };

  const handleChange = ({ target }) => {
    setinputSearch(target.value);
    console.log(target.value.length);
  };

  const handleButtonSearch = () => {
    if (document.getElementById('ingredient').checked) {
      fetchIngredientAPI();
      getDrinks(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputSearch}`);
    } else if (document.getElementById('name').checked) {
      fetchNameAPI();
      getDrinks(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch}`);
    } else if (document.getElementById('first-letter').checked) {
      fetchFirstLetterAPI();
      getDrinks(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputSearch}`);
    }
  };

  useEffect(() => {
    if (document.getElementById('first-letter').checked && inputSearch.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
  });

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
