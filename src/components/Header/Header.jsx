import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { doAuthLogout } from '../../modules/auth';

import styles from './Header.module.scss';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class Header extends Component {
  handleClick = () => {
    const { doAuthLogout } = this.props;

    doAuthLogout();
  };

  render() {
    const { isLoggedIn } = this.props;

    return (
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <Typography className={styles.title} variant="title" color="inherit">
            Loft Taxi
          </Typography>
          <Button component={Link} to="/map">
            Карта
          </Button>
          <Button component={Link} to="/profile">
            Профиль
          </Button>
          {isLoggedIn ? (
            <Button onClick={this.handleClick}>Выйти</Button>
          ) : (
            <Button component={Link} to="/login">
              Войти
            </Button>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => state.auth;
const mapDispatchToProps = { doAuthLogout };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
