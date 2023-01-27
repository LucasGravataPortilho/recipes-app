import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './renderWith';
import Recipes from '../pages/Recipes';

describe('Testa se a página de Recipes é exibida corretamente', () => {
  it('Testa se possui um header com o título "Drinks"', () => {
    renderWithRouterAndRedux(<Recipes />);
    const header = screen.getByText(/drinks/i);
    expect(header).toBeInTheDocument();
  });

  it('Testa se possui um botão "search" na tela', () => {
    renderWithRouterAndRedux(<Recipes />);
    const buttonSearch = screen.getByTestId('search-top-btn');
    userEvent.click(buttonSearch);

    const inputSearch = screen.getByTestId('search-input');
    userEvent.type(inputSearch, 'Chicken');

    const inputName = screen.getByTestId('name-search-radio');
    userEvent.click(inputName);

    const filterButton = screen.getByTestId('exec-search-btn');
    userEvent.click(filterButton);
  });

  it('Testa se faz a busca pelo ingrediente corretamente', () => {
    renderWithRouterAndRedux(<Recipes />);
    const buttonSearch = screen.getByTestId('search-top-btn');
    userEvent.click(buttonSearch);

    const inputSearch = screen.getByTestId('search-input');
    userEvent.type(inputSearch, 'Bread');

    const inputName = screen.getByTestId('ingredient-search-radio');
    userEvent.click(inputName);

    const filterButton = screen.getByTestId('exec-search-btn');
    userEvent.click(filterButton);
  });

  it('Testa se faz a busca somente com as duas primeira letras do ingrediente', () => {
    renderWithRouterAndRedux(<Recipes />);
    const buttonSearch = screen.getByTestId('search-top-btn');
    userEvent.click(buttonSearch);

    const inputSearch = screen.getByTestId('search-input');
    userEvent.type(inputSearch, 'Br');

    const inputName = screen.getByTestId('first-letter-search-radio');
    userEvent.click(inputName);

    const filterButton = screen.getByTestId('exec-search-btn');
    userEvent.click(filterButton);
  });

  it('Testa se faz a busca somente com a primeira letra do ingrediente', () => {
    renderWithRouterAndRedux(<Recipes />);
    const buttonSearch = screen.getByTestId('search-top-btn');
    userEvent.click(buttonSearch);

    const inputSearch = screen.getByTestId('search-input');
    userEvent.type(inputSearch, 'B');

    const inputName = screen.getByTestId('first-letter-search-radio');
    userEvent.click(inputName);

    const filterButton = screen.getByTestId('exec-search-btn');
    userEvent.click(filterButton);
  });

  it('Testa se ao buscar por um ingrediente inexistente, retorna o alerta', () => {
    jest.spyOn(window, 'alert');
    renderWithRouterAndRedux(<Recipes />);
    const buttonSearch = screen.getByTestId('search-top-btn');
    userEvent.click(buttonSearch);

    const inputSearch = screen.getByTestId('search-input');
    userEvent.type(inputSearch, 'rpostfdsr');

    const inputName = screen.getByTestId('ingredient-search-radio');
    userEvent.click(inputName);

    const filterButton = screen.getByTestId('exec-search-btn');
    userEvent.click(filterButton);

    expect(window.alert).toHaveBeenCalled();
  });
});
