import React, { useContext, useEffect, useState, useCallback } from 'react';
import RecipesContext from '../context/RecipesContext';

function RecipedCategoryButtons() {
  const { key, getR, urlGeral } = useContext(RecipesContext);
  const [filtro, setFiltro] = useState('');
  const [urlCat, setUrlCat] = useState('');
  const [urlPesquisa, setUrlPesquisa] = useState('');
  const [categories, setCategories] = useState([]);

  const getC = useCallback(async () => {
    if (urlCat !== '') {
      const response = await fetch(urlCat);
      const json = await response.json();
      setCategories(json[key]);
    }
  }, [key, urlCat]);

  const setVariables = useCallback(async () => {
    if (key === 'meals') {
      setUrlCat('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      setUrlPesquisa('https://www.themealdb.com/api/json/v1/1/filter.php?c=');
    } else if (key === 'drinks') {
      setUrlCat('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      setUrlPesquisa('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=');
    }
  }, [key]);

  useEffect(() => {
    setVariables();
    getC();
  }, [setVariables, getC]);

  async function categoryList({ target }) {
    const { value } = target;
    if (value === filtro) {
      getR(urlGeral);
      setFiltro('');
    } else {
      getR(`${urlPesquisa}${target.value}`);
      setFiltro(value);
    }
  }

  function makeCategories() {
    const maximo = 5;
    const cincoCategorias = categories.slice(0, maximo);
    const botoes = cincoCategorias.map(({ strCategory }, i) => {
      const botao = (
        <button
          type="button"
          data-testid={ `${strCategory}-category-filter` }
          key={ i }
          value={ strCategory }
          onClick={ categoryList }
        >
          {strCategory}
        </button>
      );
      return botao;
    });
    return botoes;
  }

  return (
    <div>
      {makeCategories()}
    </div>
  );
}

export default RecipedCategoryButtons;
