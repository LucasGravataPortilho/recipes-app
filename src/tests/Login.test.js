import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './renderWith';

// test('Farewell, front-end', () => {
//   // Este arquivo pode ser modificado ou deletado sem problemas
//   render(<App />);
//   const linkElement = screen.getByText(/TRYBE/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('Testa se a página de Login é exibida corretamente', () => {
  it('Testa se possui um título h3 com o texto "Insira seu Email"', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByRole('heading', { name: /insira seu email/i });
    expect(email).toBeInTheDocument();
  });
  it('Testa se possui um título h3 com o texto "Insira sua Senha"', () => {
    renderWithRouterAndRedux(<App />);
    const senha = screen.getByRole('heading', { name: /insira sua senha/i });
    expect(senha).toBeInTheDocument();
  });
  it('Testa se possui um botão com o texto "Entrar"', () => {
    renderWithRouterAndRedux(<App />);
    const botao = screen.getByRole('button', { name: /entrar/i });
    expect(botao).toBeInTheDocument();
  });
  it('Testa se ao digitar email e senha, o botão "Entrar" fica habilitado e direciona pra página "/meals"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    const botao = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(email, 'teste@teste.com');
    userEvent.type(senha, '1234567');
    userEvent.click(botao);
    // expect(botao).toBeVisible();
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
