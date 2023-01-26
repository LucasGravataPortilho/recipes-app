function SearchBar() {
  return (
    <>
      <div>
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="button"

        />
        Ingredient
        <input
          type="radio"
          data-testid="name-search-radio"
          name="button"
        />
        Name
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="button"
        />
        First letter
      </div>
      <button
        data-testid="exec-search-btn"
      >
        Buscar

      </button>
    </>
  );
}

export default SearchBar;
