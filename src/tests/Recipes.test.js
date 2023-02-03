import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './renderWith';

const titulo = 'page-title';

describe('Testa a renderização da pagina de Drinks', () => {
  it('Testa se os cards são renderizados', async () => {
    renderWithRouter(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <App />
      </MemoryRouter>,
    );

    const title = screen.getByTestId(titulo);
    expect(title.innerHTML).toBe('Drinks');
    await waitFor(() => expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument());
    expect(screen.getByTestId('11-recipe-card')).toBeInTheDocument();
  });

  it('Testa se os botões de categoria funcionam', async () => {
    renderWithRouter(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <App />
      </MemoryRouter>,
    );

    const idShake = 'Shake-category-filter';

    await waitFor(() => expect(screen.getByTestId(idShake)).toBeInTheDocument());
    userEvent.click(screen.getByTestId(idShake));
    userEvent.click(screen.getByTestId(idShake));
    userEvent.click(screen.getByTestId('All-category-filter'));
  });
});

describe('Testa a renderização da pagina de Meals', () => {
  it('Testa se os cards são renderizados', async () => {
    renderWithRouter(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <App />
      </MemoryRouter>,
    );

    const title = screen.getByTestId(titulo);
    expect(title.innerHTML).toBe('Meals');
    await waitFor(() => expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument());
    expect(screen.getByTestId('11-recipe-card')).toBeInTheDocument();
  });

  it('Testa se os botões de categoria funcionam', async () => {
    renderWithRouter(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <App />
      </MemoryRouter>,
    );

    const idChicken = 'Chicken-category-filter';

    await waitFor(() => expect(screen.getByTestId(idChicken)).toBeInTheDocument());
    userEvent.click(screen.getByTestId(idChicken));
    userEvent.click(screen.getByTestId(idChicken));
    userEvent.click(screen.getByTestId('All-category-filter'));
  });
});
