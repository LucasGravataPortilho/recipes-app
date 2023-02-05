import React from 'react';
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './renderWith';
import LocalStorageMock from './localStorageMock';

const recipeTitleId = 'recipe-title';
const favButtonId = 'favorite-btn';
const finishID = 'finish-recipe-btn';
const burekURL = '/meals/53060/in-progress';

global.localStorage = new LocalStorageMock();

describe('Testa as paginas de Receita in progress', () => {
  it('Se a pagina Drinks renderiza e testa o botão favorite e checkboxes', async () => {
    const mock = {
      drinks: { 17203: ['Creme de Cassis'] },
      meals: {},
    };

    const mockDone = [{
      alcoholicOrNot: '',
      category: 'Pasta',
      doneDate: '2023-02-03T12:39:28.780Z',
      id: '52844',
      image: 'https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg',
      name: 'Lasagne',
      nationality: 'Italian',
      tags: [],
      type: 'meal',
    }];

    localStorage.setItem('inProgressRecipes', JSON.stringify(mock));
    localStorage.setItem('doneRecipes', JSON.stringify(mockDone));

    renderWithRouter(
      <MemoryRouter initialEntries={ ['/drinks/17203/in-progress'] }>
        <App />
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getAllByRole('checkbox')[0].checked).toBe(true));

    const favorite = screen.getByTestId(favButtonId);
    userEvent.click(favorite);
    userEvent.click(favorite);

    userEvent.click(screen.getAllByRole('checkbox')[1]);
    await waitFor(() => expect(screen.getByTestId(finishID)).not.toBeDisabled());
    userEvent.click(screen.getByTestId(finishID));

    await waitFor(() => expect(screen.getByTestId('page-title').innerHTML).toBe('Done Recipes'));
  });

  it('Testa pagina Meals, sem nada no localstorage', async () => {
    localStorage.clear();

    renderWithRouter(
      <MemoryRouter initialEntries={ ['/meals/52844/in-progress'] }>
        <App />
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByTestId(recipeTitleId).innerHTML).toBe('Lasagne'));
    await waitFor(() => expect(screen.getAllByRole('checkbox')[0]).toBeInTheDocument());
    const checkboxes = screen.getAllByRole('checkbox');

    userEvent.click(checkboxes[0]);
    userEvent.click(checkboxes[1]);
    userEvent.click(checkboxes[2]);
    userEvent.click(checkboxes[3]);
    userEvent.click(checkboxes[4]);
    userEvent.click(checkboxes[5]);
    userEvent.click(checkboxes[6]);
    userEvent.click(checkboxes[7]);
    userEvent.click(checkboxes[8]);
    userEvent.click(checkboxes[9]);
    userEvent.click(checkboxes[10]);
    userEvent.click(checkboxes[11]);
    userEvent.click(checkboxes[12]);
    userEvent.click(checkboxes[13]);
    userEvent.click(checkboxes[14]);

    await waitFor(() => expect(screen.getByTestId(finishID)).not.toBeDisabled());

    userEvent.click(checkboxes[4]);

    const favorite = screen.getByTestId(favButtonId);
    userEvent.click(favorite);
    userEvent.click(favorite);

    userEvent.click(checkboxes[4]);

    await waitFor(() => expect(screen.getByTestId(finishID)).not.toBeDisabled());
    userEvent.click(screen.getByTestId(finishID));
  });

  it('Testa pagina Meals, sem o elemento especifico no localstorage', async () => {
    const mock = { drinks: {}, meals: {} };

    localStorage.setItem('inProgressRecipes', JSON.stringify(mock));

    renderWithRouter(
      <MemoryRouter initialEntries={ [burekURL] }>
        <App />
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByTestId(recipeTitleId).innerHTML).toBe('Burek'));
  });
});

describe('Testa as paginas de Details in progress', () => {
  it('A Pagina de Details de uma receita in progress', async () => {
    const mock = {
      drinks: { 17203: ['Creme de Cassis'], 17222: ['Gin'] },
      meals: {},
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(mock));

    renderWithRouter(
      <MemoryRouter initialEntries={ ['/drinks/17203'] }>
        <App />
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getAllByTestId('start-recipe-btn').innerHTML).not.toBe('Start Recipe'));
  });
});
