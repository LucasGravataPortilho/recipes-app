import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './renderWith';
import Profile from '../pages/Profile';

describe('Testa se a página de Profile é exibida corretamente', () => {
  it('Testa se possui um header com o título "Profile"', () => {
    renderWithRouterAndRedux(<Profile />);
    const header = screen.getByText(/Profile/i);

    expect(header).toBeInTheDocument();
  });
  it('Testa se possui o elemento de email ', () => {
    renderWithRouterAndRedux(<Profile />);
    const email = screen.getByTestId('profile-email');

    expect(email).toBeInTheDocument();
  });
  it('Testa se possui um botão com o texto "Done Recipes"', () => {
    renderWithRouterAndRedux(<Profile />);
    const profileDoneBtn = screen.getByTestId('profile-done-btn');
    expect(profileDoneBtn).toBeInTheDocument();
  });
  it('Testa se possui um botão com o texto "Favorite Recipes"', () => {
    renderWithRouterAndRedux(<Profile />);
    const profileFavBtn = screen.getByTestId('profile-favorite-btn');
    expect(profileFavBtn).toBeInTheDocument();
  });
  it('Testa se possui um botão com o texto "Logout"', () => {
    renderWithRouterAndRedux(<Profile />);
    const profileLOBtn = screen.getByTestId('profile-logout-btn');
    expect(profileLOBtn).toBeInTheDocument();
    userEvent.click(profileLOBtn);
  });
});
