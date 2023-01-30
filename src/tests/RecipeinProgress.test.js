import React from 'react';
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom';
// import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './renderWith';

describe('Testa as paginas de Receita in progress', () => {
  it('Drinks', async () => {
    renderWithRouterAndRedux(
      <MemoryRouter initialEntries={ ['/drinks/17203/in-progress'] }>
        <App />
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByTestId('recipe-title').innerHTML).toBe('Kir'));
  });

  it('Meals', async () => {
    renderWithRouterAndRedux(
      <MemoryRouter initialEntries={ ['/meals/53065/in-progress'] }>
        <App />
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByTestId('recipe-title').innerHTML).toBe('Sushi'));
  });
});
