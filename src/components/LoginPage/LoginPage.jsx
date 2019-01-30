import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LoginForm from '../LoginForm';

class LoginPage extends Component {
  componentDidMount() {
    document.title = 'Войти | Loft Taxi';
  }

  render() {
    const { isLoggedIn } = this.props;

    if (isLoggedIn) {
      return <Redirect to="/map" />;
    }

    return <LoginForm />;
  }
}

const mapStateToProps = state => state.auth;

export default connect(mapStateToProps)(LoginPage);
