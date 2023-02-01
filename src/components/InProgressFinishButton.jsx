import { useContext } from 'react';
import CheckboxesContext from '../context/checkboxesContext';

function InProgressFinishButton() {
  const { usedIngredients, allIngredients } = useContext(CheckboxesContext);

  return (
    <button
      type="button"
      data-testid="finish-recipe-btn"
      disabled={ (usedIngredients.length !== allIngredients.length) }
    >
      Finish
    </button>
  );
}

export default InProgressFinishButton;
