import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const readObject = (key, defaultValue) => {
    const object = localStorage.getItem(key);
    return JSON.parse(object) || defaultValue;
  };
  const USER_KEY = 'user';
  const getUser = () => readObject(USER_KEY, {});
  const userEmail = getUser().email;

  return (
    <div>
      <Header title="Profile" />
      <span data-testid="profile-email">{ userEmail }</span>
      <div>
        <Link to="/done-recipes">
          <button
            type="button"
            data-testid="profile-done-btn"
          >
            Done Recipes
          </button>
        </Link>

        <Link to="/favorite-recipes">
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </button>
        </Link>

        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => localStorage.clear() }
          >
            Logout
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
