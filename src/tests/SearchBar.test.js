import React from 'react';
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './renderWith';
import App from '../App';

const idButtonSearch = ('search-top-btn');
const idInputSearch = ('search-input');
const idFilterButton = ('exec-search-btn');
const idNameSearch = 'name-search-radio';

describe('Testa se a página de Recipes é exibida corretamente', () => {
  it('Testa se possui um botão "search" na tela', () => {
    renderWithRouter(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <App />
      </MemoryRouter>,
    );
    const buttonSearch = screen.getByTestId(idButtonSearch);
    userEvent.click(buttonSearch);

    const inputSearch = screen.getByTestId(idInputSearch);
    userEvent.type(inputSearch, 'Chicken');

    const inputName = screen.getByTestId(idNameSearch);
    userEvent.click(inputName);

    const filterButton = screen.getByTestId(idFilterButton);
    userEvent.click(filterButton);
  });

  it('Testa se faz a busca pelo ingrediente corretamente', () => {
    renderWithRouter(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <App />
      </MemoryRouter>,
    );
    const buttonSearch = screen.getByTestId(idButtonSearch);
    userEvent.click(buttonSearch);

    const inputSearch = screen.getByTestId(idInputSearch);
    userEvent.type(inputSearch, 'Bread');

    const inputName = screen.getByTestId('ingredient-search-radio');
    userEvent.click(inputName);

    const filterButton = screen.getByTestId(idFilterButton);
    userEvent.click(filterButton);
  });

  it('Testa se faz a busca somente com as duas primeira letras do ingrediente', async () => {
    renderWithRouter(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <App />
      </MemoryRouter>,
    );
    const buttonSearch = screen.getByTestId(idButtonSearch);
    userEvent.click(buttonSearch);

    const inputSearch = screen.getByTestId(idInputSearch);
    userEvent.type(inputSearch, 'Br');

    const inputName = screen.getByTestId('first-letter-search-radio');
    userEvent.click(inputName);

    const filterButton = screen.getByTestId(idFilterButton);
    userEvent.click(filterButton);
  });

  it('Testa se faz a busca somente com a primeira letra do ingrediente', () => {
    renderWithRouter(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <App />
      </MemoryRouter>,
    );
    const buttonSearch = screen.getByTestId(idButtonSearch);
    userEvent.click(buttonSearch);

    const inputSearch = screen.getByTestId(idInputSearch);
    userEvent.type(inputSearch, 'B');

    const inputName = screen.getByTestId('first-letter-search-radio');
    userEvent.click(inputName);

    const filterButton = screen.getByTestId(idFilterButton);
    userEvent.click(filterButton);
  });

  it('Testa se ao buscar por um ingrediente inexistente, retorna o alerta', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    renderWithRouter(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <App />
      </MemoryRouter>,
    );
    const buttonSearch = screen.getByTestId(idButtonSearch);
    userEvent.click(buttonSearch);

    const inputSearch = screen.getByTestId(idInputSearch);
    userEvent.type(inputSearch, 'rpostfdsr');

    const inputName = screen.getByTestId('ingredient-search-radio');
    userEvent.click(inputName);

    const filterButton = screen.getByTestId(idFilterButton);
    userEvent.click(filterButton);
    await waitFor(() => expect(alertMock).toHaveBeenCalled());
  });

  it('Testa se ao buscar sem parametro, retorna o alerta', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    renderWithRouter(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <App />
      </MemoryRouter>,
    );
    const buttonSearch = screen.getByTestId(idButtonSearch);
    userEvent.click(buttonSearch);

    const filterButton = screen.getByTestId(idFilterButton);
    userEvent.click(filterButton);
    await waitFor(() => expect(alertMock).toHaveBeenCalled());
  });

  it('Testa se ao buscar uma bebida exatamente, redireciona para sua pagina', async () => {
    renderWithRouter(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <App />
      </MemoryRouter>,
    );
    const buttonSearch = screen.getByTestId(idButtonSearch);
    userEvent.click(buttonSearch);

    const inputSearch = screen.getByTestId(idInputSearch);
    userEvent.type(inputSearch, 'ABC');

    const inputName = screen.getByTestId(idNameSearch);
    userEvent.click(inputName);

    const filterButton = screen.getByTestId(idFilterButton);
    userEvent.click(filterButton);

    await waitFor(() => expect(screen.getByTestId('recipe-title').innerHTML).toBe('ABC'));
  });

  it('Testa se ao buscar uma comida exatamente, redireciona para sua pagina', async () => {
    renderWithRouter(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <App />
      </MemoryRouter>,
    );
    const buttonSearch = screen.getByTestId(idButtonSearch);
    userEvent.click(buttonSearch);

    const inputSearch = screen.getByTestId(idInputSearch);
    userEvent.type(inputSearch, 'Sushi');

    const inputName = screen.getByTestId(idNameSearch);
    userEvent.click(inputName);

    const filterButton = screen.getByTestId(idFilterButton);
    userEvent.click(filterButton);

    await waitFor(() => expect(screen.getByTestId('recipe-title').innerHTML).toBe('Sushi'));
  });
});
