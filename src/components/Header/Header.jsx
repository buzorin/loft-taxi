import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
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
      <AppBar position="relative" color="inherit">
        <Toolbar>
          <Typography className={styles.title} variant="title" color="inherit">
            Loft Taxi
          </Typography>
          <Button component={NavLink} to="/map">
            Карта
          </Button>
          <Button component={NavLink} to="/profile">
            Профиль
          </Button>
          {isLoggedIn ? (
            <Button onClick={this.handleClick}>Выйти</Button>
          ) : (
            <Button component={NavLink} to="/login">
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
