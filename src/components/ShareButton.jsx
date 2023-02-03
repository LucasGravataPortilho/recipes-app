import PropTypes from 'prop-types';
import { useState } from 'react';
import Share from '../images/shareIcon.svg';

function ShareButton({ type, identificacao }) {
  const [copied, setCopied] = useState(false);

  function toClipboard() {
    const link = `http://localhost:3000/${type}/${identificacao}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
  }

  return (
    <div>
      <input
        type="image"
        alt="favorite"
        data-testid="share-btn"
        onClick={ toClipboard }
        src={ Share }
      />
      {(copied) ? (<p>Link copied!</p>) : ('')}
    </div>
  );
}

ShareButton.propTypes = {
  type: PropTypes.string,
  identificacao: PropTypes.string,
}.isRequired;

export default ShareButton;
