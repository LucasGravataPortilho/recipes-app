import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Drinks from '../components/Drinks';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Meals from '../components/Meals';
import './Recipes.css';

function Recipes() {
  const [meal, setMeal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMeal(location.pathname === '/meals');
  }, [location]);

  return (
    <div>
      <Header title={ (meal) ? ('Meals') : ('Drinks') } />
      {(meal) ? <Meals /> : <Drinks />}
      <Footer />
    </div>
  );
}

export default Recipes;
