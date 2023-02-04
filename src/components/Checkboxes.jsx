import { useContext } from 'react';
import CheckboxesContext from '../context/checkboxesContext';
import './Checkboxes.css';

function Checkboxes() {
  const checkStyle = {
    textDecoration: 'line-through solid black',
  };

  const { usedIngredients, allIngredients,
    changeCheckbox } = useContext(CheckboxesContext);
  function createIngredients() {
    const ingredients = allIngredients.map((e, i) => {
      const ingredient = (
        <label
          data-testid={ `${i}-ingredient-step` }
          key={ i }
          htmlFor={ `ingredient-${i}` }
          style={ (usedIngredients.includes(e)) ? (checkStyle) : {} }
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
