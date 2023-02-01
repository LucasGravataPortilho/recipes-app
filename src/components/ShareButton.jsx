import PropTypes from 'prop-types';

function ShareButton({ type, identificacao }) {
  function toClipboard({ target }) {
    const link = `http://localhost:3000/${type}/${identificacao}`;
    navigator.clipboard.writeText(link);
    target.innerHTML = 'Link copied!';
  }
  return (
    <button
      type="button"
      data-testid="share-btn"
      onClick={ toClipboard }
    >
      Share
    </button>
  );
}

ShareButton.propTypes = {
  type: PropTypes.string,
  identificacao: PropTypes.string,
}.isRequired;

export default ShareButton;
