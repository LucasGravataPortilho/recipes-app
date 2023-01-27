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
