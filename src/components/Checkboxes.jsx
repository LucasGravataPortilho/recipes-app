import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types'; // Sempre importante para declarar props

function Checkboxes({ obj }) {
  const [ingredients, setIngredients] = useState([]);

  const getIngredients = useCallback(() => {
    if (obj !== []) {
      const ingredientValues = Object.values(obj).filter(
        (e, i) => (Object.keys(obj)[i].includes('Ingredient')),
      );
      const semVazio = ingredientValues.filter((e) => (e !== null) && (e !== ''));
      setIngredients(semVazio);
    }
  }, [obj]);

  useEffect(() => {
    getIngredients();
  }, [getIngredients]);

  function changeCheckbox({ target }) {
    const { value } = target;

    const option = document.getElementById(value);
    if (option.className === '') {
      option.className = 'cross';
    } else {
      option.className = '';
    }
  }

  function createIngredients() {
    const ings = ingredients.map((e, i) => {
      if (e !== '' && e !== null) {
        const ingredient = (
          <label
            data-testid={ `${i}-ingredient-step` }
            key={ i }
            htmlFor={ `ingredient-${i}` }
            id={ i }
            className=""
          >
            <input type="checkbox" onChange={ changeCheckbox } value={ i } />
            <p>
              {e}
            </p>
          </label>
        );
        return ingredient;
      }
      return ('');
    });

    return ings;
  }

  return (
    <div>
      {createIngredients()}
    </div>
  );
}

Checkboxes.propTypes = {
  obj: PropTypes.shape().isRequired,
};

export default Checkboxes;
