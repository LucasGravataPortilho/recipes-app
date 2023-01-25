import React from 'react';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './renderWith';

const titulo = 'page-title';
const emailId = 'email-input';
const passwordID = 'password-input';

describe('Testa se as paginas corretas tem o Header', () => {
  it('Drinks', () => {
    renderWithRouterAndRedux(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <App />
      </MemoryRouter>,
    );

    const title = screen.getByTestId(titulo);
    expect(title.innerHTML).toBe('Drinks');
  });

  it('Meals', () => {
    renderWithRouterAndRedux(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <App />
      </MemoryRouter>,
    );

    const title = screen.getByTestId(titulo);
    expect(title.innerHTML).toBe('Meals');

    const botaoPesquisa = screen.getByTestId('search-top-btn');
    userEvent.click(botaoPesquisa);

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  it('Profile', () => {
    renderWithRouterAndRedux(
      <MemoryRouter initialEntries={ ['/profile'] }>
        <App />
      </MemoryRouter>,
    );

    const title = screen.getByTestId(titulo);
    expect(title.innerHTML).toBe('Profile');
  });

  it('Done Recipes', () => {
    renderWithRouterAndRedux(
      <MemoryRouter initialEntries={ ['/done-recipes'] }>
        <App />
      </MemoryRouter>,
    );

    const title = screen.getByTestId(titulo);
    expect(title.innerHTML).toBe('Done Recipes');
  });
});

describe('Testa se as paginas corretas tem o Header', () => {
  it('Drinks', () => {
    renderWithRouterAndRedux(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('Meals', () => {
    renderWithRouterAndRedux(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('Profile', () => {
    renderWithRouterAndRedux(
      <MemoryRouter initialEntries={ ['/profile'] }>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});

describe('Testa se os botoes funcionam corretamente', () => {
  it('Profile, no Header', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId(emailId);
    const senha = screen.getByTestId(passwordID);
    const botao = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(email, 'teste@teste.com');
    userEvent.type(senha, '1234567');
    userEvent.click(botao);

    const profile = screen.getByTestId('profile-top-btn');
    userEvent.click(profile);

    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });

  it('Drinks no Footer', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId(emailId);
    const senha = screen.getByTestId(passwordID);
    const botao = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(email, 'alguem@teste.com');
    userEvent.type(senha, '1234567');
    userEvent.click(botao);

    const drinks = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinks);

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');

    const meals = screen.getByTestId('meals-bottom-btn');
    userEvent.click(meals);
  });

  it('Meals no Footer', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    const botao = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(email, 'teste@teste.com');
    userEvent.type(senha, '1234567');
    userEvent.click(botao);

    const drinks = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinks);

    const meals = screen.getByTestId('meals-bottom-btn');
    userEvent.click(meals);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
