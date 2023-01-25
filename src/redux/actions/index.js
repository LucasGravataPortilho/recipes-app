export const SEND_LOGIN = 'SEND_LOGIN';
const sendLogin = (email, password) => ({
  type: 'SEND_LOGIN',
  payload: {
    email,
    password,
  },
});

export default sendLogin;
