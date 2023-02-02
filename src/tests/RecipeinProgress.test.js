import React from 'react';
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './renderWith';

describe('Testa as paginas de Receita in progress', () => {
  it('Drinks', async () => {
    const { history } = renderWithRouterAndRedux(
      <MemoryRouter initialEntries={ ['/drinks/17203/in-progress'] }>
        <App />
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByTestId('recipe-title').innerHTML).toBe('Kir'));

    const favorite = screen.getByTestId('favorite-btn');
    userEvent.click(favorite);

    history.push('/drinks/17203');
  });

  it('Meals', async () => {
    renderWithRouterAndRedux(
      <MemoryRouter initialEntries={ ['/meals/53060/in-progress'] }>
        <App />
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByTestId('recipe-title').innerHTML).toBe('Burek'));

    await waitFor(() => expect(screen.getAllByRole('checkbox')[0]).toBeInTheDocument());
    const checkboxes = screen.getAllByRole('checkbox');

    userEvent.click(checkboxes[0]);
    userEvent.click(checkboxes[1]);
    userEvent.click(checkboxes[2]);
    userEvent.click(checkboxes[3]);
    userEvent.click(checkboxes[4]);
    userEvent.click(checkboxes[5]);

    const finish = screen.getByTestId('finish-recipe-btn');
    await waitFor(() => expect(finish).not.toBeDisabled());

    userEvent.click(checkboxes[4]);
  });
});

describe('Testa as paginas de Receita details', () => {
  it('Drinks', async () => {
    const fakeLS = { drinks: { 17203: ['Creme de Cassis'] } };
    await localStorage.setItem('inProgressRecipes', JSON.stringify(fakeLS));
    renderWithRouterAndRedux(
      <MemoryRouter initialEntries={ ['/drinks/17203'] }>
        <App />
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByTestId('favorite-btn')).toBeInTheDocument());
  });
});
