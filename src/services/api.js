export async function getMeals(url) {
  const response = await fetch(url);
  const json = await response.json();
  return json.meals;
}

export async function getDrinks(url) {
  const response = await fetch(url);
  const json = await response.json();
  return json.drinks;
}

export async function getMealCategoryList(category) {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(url);
  const json = await response.json();
  return json.meals;
}

export async function getDrinkCategoryList(category) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(url);
  const json = await response.json();
  return json.drinks;
}
