// import React from 'react';
// import { screen } from '@testing-library/react';
// // import userEvent from '@testing-library/user-event';
// import App from '../App';
// import renderWithRouterAndRedux from './renderWith';

// describe('Testa se a página de Profile é exibida corretamente', () => {
//   it('Testa se possui um header com o título "Profile"', () => {
//     renderWithRouterAndRedux(<App />);
//     const header = screen.getByRole('Profile');

//     expect(header).toBeInTheDocument();
//   });
//   it('Testa se possui o elemento de email ', () => {
//     renderWithRouterAndRedux(<App />);
//     const email = screen.getByTestId('profile-email');

//     expect(email).toBeInTheDocument();
//   });
//   it('Testa se possui um botão com o texto "Done Recipes"', () => {
//     renderWithRouterAndRedux(<App />);
//     const profileDoneBtn = screen.getById('profile-done-btn');
//     expect(profileDoneBtn).toBeInTheDocument();
//   });
//   it('Testa se possui um botão com o texto "Favorite Recipes"', () => {
//     renderWithRouterAndRedux(<App />);
//     const profileFavBtn = screen.getById('profile-favorite-btn');
//     expect(profileFavBtn).toBeInTheDocument();
//   });
//   it('Testa se possui um botão com o texto "Logout"', () => {
//     renderWithRouterAndRedux(<App />);
//     const profileLOBtn = screen.getById('profile-logout-btn');
//     expect(profileLOBtn).toBeInTheDocument();
//   });
// });
