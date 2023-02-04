import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './renderWith';
import LocalStorageMock from './localStorageMock';
import DoneRecipes from '../pages/DoneRecipes';

global.localStorage = new LocalStorageMock();

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe('Testa as paginas de Done Recipes', () => {
  it('Se a pagina renderiza corretamente sem Local Storage', async () => {
    renderWithRouter(<DoneRecipes />);

    await waitFor(() => expect(screen.getByTestId('page-title').innerHTML).toBe('Done Recipes'));
  });

  it('Se a pagina renderiza com Local Storage e os botoes', async () => {
    const mockDone = [
      {
        alcoholicOrNot: '',
        category: 'Pasta',
        doneDate: '2023-02-03T12:39:28.780Z',
        id: '52844',
        image: 'https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg',
        name: 'Lasagne',
        nationality: 'Italian',
        tags: [],
        type: 'meal',
      },
      {
        alcoholicOrNot: 'Alcoholic',
        category: 'Shot',
        doneDate: '2023-02-03T12:39:28.780Z',
        id: '13332',
        image: 'https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg',
        name: 'B-53',
        nationality: '',
        tags: ['shot', 'flaming'],
        type: 'drink',
      },
    ];

    localStorage.setItem('doneRecipes', JSON.stringify(mockDone));

    jest.spyOn(navigator.clipboard, 'writeText');

    renderWithRouter(<DoneRecipes />);

    await waitFor(() => expect(screen.getByTestId('0-horizontal-top-text')).toBeInTheDocument());
    userEvent.click(screen.getByTestId('0-horizontal-share-btn'));
    userEvent.click(screen.getByTestId('filter-by-meal-btn'));
    userEvent.click(screen.getByTestId('filter-by-drink-btn'));
    userEvent.click(screen.getByTestId('filter-by-all-btn'));
  });
});
