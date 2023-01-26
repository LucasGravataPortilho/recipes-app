import React, { useState } from 'react';

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
  };

  const handleButtonSearch = () => {
    if (document.getElementById('ingredient').checked) {
      fetchIngredientAPI();
    } else if (document.getElementById('name').checked) {
      fetchNameAPI();
    } else if (document.getElementById('first-letter').checked) {
      fetchFirstLetterAPI();
    }
  };

  return (

    <>
      <div>
        <input
          type="text"
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
