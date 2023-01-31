import React, { useContext, useState, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';

function SearchBar() {
  const { key, searchR } = useContext(RecipesContext);
  const [ingredient, setIngredient] = useState('');
  const [name, setName] = useState('');
  const [letter, setLetter] = useState('');
  const [inputSearch, setinputSearch] = useState('');

  useEffect(() => {
    if (key === 'meals') {
      setIngredient('https://www.themealdb.com/api/json/v1/1/filter.php?i=');
      setName('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setLetter('https://www.themealdb.com/api/json/v1/1/search.php?f=');
    } else {
      setIngredient('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=');
      setName('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      setLetter('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=');
    }
  }, [key, setIngredient, setLetter, setName]);

  const handleButtonSearch = async () => {
    if (document.getElementById('ingredient').checked) {
      try {
        await searchR(`${ingredient}${inputSearch}`);
      } catch (error) {
        global.alert('ingrediente não existe');
      }
    } else if (document.getElementById('name').checked) {
      searchR(`${name}${inputSearch}`);
    } else if (document.getElementById('first-letter').checked) {
      if (inputSearch.length === 1) {
        searchR(`${letter}${inputSearch}`);
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
    } else { global.alert('escolha uma opção'); }
  };

  const handleChange = ({ target }) => {
    setinputSearch(target.value);
  };

  return (
    <div className="search-bar">
      <div>
        <input
          type="text"
          data-testid="search-input"
          placeholder="Search"
          value={ inputSearch }
          onChange={ handleChange }
        />
        <div className="radios">
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
      </div>
      <button
        className="buscar"
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleButtonSearch }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
