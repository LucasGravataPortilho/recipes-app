import React from 'react';
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './renderWith';

const recipeTitleId = 'recipe-title';
const favButtonId = 'favorite-btn';

describe('Testa as paginas de Receita in progress', () => {
  it('Drinks', async () => {
    renderWithRouterAndRedux(
      <MemoryRouter initialEntries={ ['/drinks/17203/in-progress'] }>
        <App />
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByTestId(recipeTitleId).innerHTML).toBe('Kir'));

    const favorite = screen.getByTestId(favButtonId);
    userEvent.click(favorite);
    userEvent.click(favorite);
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

  it('Meals - favorite button', async () => {
    renderWithRouterAndRedux(
      <MemoryRouter initialEntries={ ['/meals/53060/in-progress'] }>
        <App />
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByTestId(recipeTitleId).innerHTML).toBe('Burek'));

    const favorite = screen.getByTestId(favButtonId);
    userEvent.click(favorite);
    userEvent.click(favorite);
  });
});

describe('Testa o favorite button', () => {
  it('Pagina Recipe Details', async () => {
    renderWithRouterAndRedux(
      <MemoryRouter initialEntries={ ['/drinks/17203'] }>
        <App />
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByTestId(favButtonId)).toBeInTheDocument());
    userEvent.click(screen.getByTestId(favButtonId));
  });
});
