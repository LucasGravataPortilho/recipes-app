const INITIAL_STATE = {
  email: '',
  password: '',

};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SEND_LOGIN': {
    return {
      ...state,
      email: action.payload.email,
      password: action.payload.password,
    };
  }
  default:
    return state;
  }
};

export default loginReducer;
