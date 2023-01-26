import React from 'react';
import { useLocation } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Recipes() {
  const location = useLocation();

  return (
    <div>
      <Header title={ (location.pathname === '/meals') ? ('Meals') : ('Drinks') } />
      <Footer />
    </div>
  );
}

export default Recipes;
