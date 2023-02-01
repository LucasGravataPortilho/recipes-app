import { useContext } from 'react';
import CheckboxesContext from '../context/checkboxesContext';

function Checkboxes() {
  const { usedIngredients, allIngredients,
    changeCheckbox } = useContext(CheckboxesContext);
  function createIngredients() {
    const ingredients = allIngredients.map((e, i) => {
      const ingredient = (
        <label
          data-testid={ `${i}-ingredient-step` }
          key={ i }
          htmlFor={ `ingredient-${i}` }
        >
          <input
            type="checkbox"
            onChange={ changeCheckbox }
            value={ e }
            defaultChecked={ usedIngredients.includes(e) }
            className="check"
          />
          {e}
        </label>
      );
      return ingredient;
    });

    return ingredients;
  }

  return (
    <div>
      {createIngredients()}
    </div>
  );
}

export default Checkboxes;
