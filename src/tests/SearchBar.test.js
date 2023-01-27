import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './renderWith';
import Recipes from '../pages/Recipes';

const idButtonSearch = ('search-top-btn');
const idInputSearch = ('search-input');
const idFilterButton = ('exec-search-btn');

describe('Testa se a página de Recipes é exibida corretamente', () => {
  it('Testa se possui um header com o título "Drinks"', () => {
    renderWithRouterAndRedux(<Recipes />);
    const header = screen.getByText(/drinks/i);
    expect(header).toBeInTheDocument();
  });

  it('Testa se possui um botão "search" na tela', () => {
    renderWithRouterAndRedux(<Recipes />);
    const buttonSearch = screen.getByTestId(idButtonSearch);
    userEvent.click(buttonSearch);

    const inputSearch = screen.getByTestId(idInputSearch);
    userEvent.type(inputSearch, 'Chicken');

    const inputName = screen.getByTestId('name-search-radio');
    userEvent.click(inputName);

    const filterButton = screen.getByTestId(idFilterButton);
    userEvent.click(filterButton);
  });

  it('Testa se faz a busca pelo ingrediente corretamente', () => {
    renderWithRouterAndRedux(<Recipes />);
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
    renderWithRouterAndRedux(<Recipes />);
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
    renderWithRouterAndRedux(<Recipes />);
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
    renderWithRouterAndRedux(<Recipes />);
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

  it('Testa se ao buscar por um ingrediente inexistente, retorna o alerta', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    renderWithRouterAndRedux(<Recipes />);
    const buttonSearch = screen.getByTestId(idButtonSearch);
    userEvent.click(buttonSearch);

    const filterButton = screen.getByTestId(idFilterButton);
    userEvent.click(filterButton);
    await waitFor(() => expect(alertMock).toHaveBeenCalled());
  });
});
