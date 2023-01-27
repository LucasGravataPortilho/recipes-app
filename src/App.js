import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom/cjs/react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeMealDetail from './pages/RecipeMealDetail';
import RecipeDrinkDetail from './pages/RecipeDrinkDetail';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route
          exact
          path="/meals/:id"
          render={ (props) => <RecipeMealDetail { ...props } /> }
        />
        <Route
          exact
          path="/drinks/:id"
          render={ (props) => <RecipeDrinkDetail { ...props } /> }
        />
      </Switch>
    </div>
  );
}

export default App;
