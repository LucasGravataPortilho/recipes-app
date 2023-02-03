import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import { renderWithRouter } from './renderWith';

describe('Testa se a página de Profile é exibida corretamente', () => {
  it('Testa se possui um header com o título "Profile"', () => {
    renderWithRouter(<Profile />);
    const header = screen.getByText(/Profile/i);

    expect(header).toBeInTheDocument();
  });
  it('Testa se possui o elemento de email ', () => {
    renderWithRouter(<Profile />);
    const email = screen.getByTestId('profile-email');

    expect(email).toBeInTheDocument();
  });
  it('Testa se possui um botão com o texto "Done Recipes"', () => {
    renderWithRouter(<Profile />);
    const profileDoneBtn = screen.getByTestId('profile-done-btn');
    expect(profileDoneBtn).toBeInTheDocument();
  });
  it('Testa se possui um botão com o texto "Favorite Recipes"', () => {
    renderWithRouter(<Profile />);
    const profileFavBtn = screen.getByTestId('profile-favorite-btn');
    expect(profileFavBtn).toBeInTheDocument();
  });
  it('Testa se possui um botão com o texto "Logout"', () => {
    renderWithRouter(<Profile />);
    const profileLOBtn = screen.getByTestId('profile-logout-btn');
    expect(profileLOBtn).toBeInTheDocument();
    userEvent.click(profileLOBtn);
  });
});
