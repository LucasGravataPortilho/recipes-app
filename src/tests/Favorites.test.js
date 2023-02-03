import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './renderWith';
import FavoriteRecipes from '../pages/FavoriteRecipes';

describe('Testa se a página de Profile é exibida corretamente', () => {
  it('Testa se possui um header com o título "Profile"', () => {
    renderWithRouter(<FavoriteRecipes />);
    const header = screen.getAllByRole('button');

    expect(header.length).toBe(4);
  });
});
