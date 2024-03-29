import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './renderWith';
import LocalStorageMock from './localStorageMock';
import FavoriteRecipes from '../pages/FavoriteRecipes';

global.localStorage = new LocalStorageMock();

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe('Testa as paginas de Done Recipes', () => {
  it('Se a pagina renderiza corretamente sem Local Storage', async () => {
    renderWithRouter(<FavoriteRecipes />);

    await waitFor(() => expect(screen.getByTestId('page-title').innerHTML).toBe('Favorite Recipes'));
  });

  it('Se a pagina renderiza com Local Storage e os botoes', async () => {
    const mockDone = [
      {
        alcoholicOrNot: '',
        category: 'Pasta',
        id: '52844',
        image: 'https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg',
        name: 'Lasagne',
        nationality: 'Italian',
        type: 'meal',
      },
      {
        alcoholicOrNot: 'Alcoholic',
        category: 'Shot',
        id: '13332',
        image: 'https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg',
        name: 'B-53',
        nationality: '',
        type: 'drink',
      },
    ];

    localStorage.setItem('favoriteRecipes', JSON.stringify(mockDone));

    jest.spyOn(navigator.clipboard, 'writeText');

    renderWithRouter(<FavoriteRecipes />);

    await waitFor(() => expect(screen.getByTestId('0-horizontal-top-text')).toBeInTheDocument());
    userEvent.click(screen.getByTestId('0-horizontal-share-btn'));
    userEvent.click(screen.getByTestId('filter-by-meal-btn'));
    userEvent.click(screen.getByTestId('filter-by-drink-btn'));
    userEvent.click(screen.getByTestId('filter-by-all-btn'));
    userEvent.click(screen.getByTestId('0-horizontal-favorite-btn'));
  });
});
