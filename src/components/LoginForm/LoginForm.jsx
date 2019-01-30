import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAuthRequest } from '../../modules/auth';

import styles from './LoginForm.module.scss';
import Paper from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

class LoginForm extends Component {
  state = {
    login: {
      value: '',
      error: null
    },
    password: {
      value: '',
      error: null
    }
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: {
        value,
        error: null
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { login, password } = this.state;
    const { fetchAuthRequest } = this.props;

    if (!login.value || !password.value) {
      this.setState(state => {
        const { login, password } = state;

        return {
          ...state,
          login: {
            value: login.value,
            error: login.value ? null : 'Укажите имя пользователя'
          },
          password: {
            value: password.value,
            error: password.value ? null : 'Укажите пароль'
          }
        };
      });
    } else {
      const data = {
        login: login.value,
        password: password.value
      };

      fetchAuthRequest(data);
    }
  };

  renderErrorMessage = message => (
    <Typography variant="subheading" color="error" align="center">
      {message}
    </Typography>
  );

  render() {
    const { login, password } = this.state;
    const { isLoading, error } = this.props;

    return (
      <div className={styles.container}>
        <Paper className={styles.paper}>
          <form className={styles.form} onSubmit={this.handleSubmit} noValidate>
            <Typography variant="h4" color="inherit" align="center">
              Войти
            </Typography>
            {error && this.renderErrorMessage(error)}
            {isLoading && <LinearProgress />}
            <TextField
              type="text"
              label="Имя пользователя"
              placeholder="Имя пользователя"
              name="login"
              value={login.value}
              onChange={this.handleChange}
              helperText={login.error ? login.error : null}
              error={login.error ? true : false}
              margin="none"
              fullWidth
              required
            />
            <TextField
              type="password"
              label="Пароль"
              placeholder="Пароль"
              name="password"
              value={password.value}
              onChange={this.handleChange}
              helperText={password.error ? password.error : null}
              error={password.error ? true : false}
              margin="none"
              fullWidth
              required
            />
            <Button
              type="submit"
              variant="outlined"
              size="medium"
              color="primary"
            >
              Войти
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => state.auth;
const mapDispatchToProps = {
  fetchAuthRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
