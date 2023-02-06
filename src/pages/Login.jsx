import React from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import shawarma from '../images/Shawarma-pana.png';

class Login extends React.Component {
  state = {
    isLoginButtonDisabled: true,
    password: '',
    email: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validateInputs);
  };

  validateInputs = () => {
    const { password, email } = this.state;
    const minTextPassword = 7;
    const textEmail = /\S+@\S+\.\S+/;
    const isButtonDisabled = textEmail.test(email) && password.length >= minTextPassword;
    this.setState({
      isLoginButtonDisabled: !isButtonDisabled,
    });
  };

  handleClickButton = (event) => {
    event.preventDefault();
    const { history } = this.props;
    const { email } = this.state;
    const user = { email };
    localStorage.setItem('user', JSON.stringify(user));
    history.push('/meals');
  };

  render() {
    const { email, password, isLoginButtonDisabled } = this.state;
    return (
      <div className="login-page">
        <div className="first-box">
          <form>
            <h1>Trybe Kitchen</h1>
            <input
              type="email"
              id="email"
              name="email"
              value={ email }
              placeholder="Digite seu email"
              data-testid="email-input"
              onChange={ this.handleChange }
              className="email-input"
            />

            <input
              type="password"
              id="password"
              name="password"
              value={ password }
              placeholder="Digite sua senha"
              data-testid="password-input"
              onChange={ this.handleChange }
              className="password-input"
            />
            <button
              data-testid="login-submit-btn"
              type="submit"
              disabled={ isLoginButtonDisabled }
              onClick={ this.handleClickButton }
              className="button-login"
            >
              Entrar
            </button>
          </form>
        </div>
        <div className="second-box">
          <b>
            &quot;Mais tempo para desfrutar, menos tempo para planejar suas
            refeições.&quot;
          </b>
          <img src={ shawarma } alt="shawarma" className="second-box-image" />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
