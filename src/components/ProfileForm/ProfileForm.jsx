import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAuthRequest } from '../../modules/auth';

import styles from './ProfileForm.module.scss';
import Paper from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import Button from '@material-ui/core/Button';

const lsProfile = JSON.parse(localStorage.getItem('profile'));
const initValues = {
  cardName: lsProfile && lsProfile.cardName ? lsProfile.cardName : '',
  cardNumber: lsProfile && lsProfile.cardNumber ? lsProfile.cardNumber : '',
  cardExp: lsProfile && lsProfile.cardExp ? lsProfile.cardExp : '',
  cardCvv: lsProfile && lsProfile.cardCvv ? lsProfile.cardCvv : ''
};

class ProfileForm extends Component {
  state = {
    cardName: {
      value: initValues.cardName,
      error: null
    },
    cardNumber: {
      value: initValues.cardNumber,
      error: null
    },
    cardExp: {
      value: initValues.cardExp,
      error: null
    },
    cardCvv: {
      value: initValues.cardCvv,
      error: null
    }
  };

  handleChange = e => {
    let { name, value } = e.target;
    let error = null;

    switch (name) {
      case 'cardName':
        value = value.replace(/[^A-Za-z ]/gi, '').toUpperCase();
        error = value ? null : 'Укажите имя владельца карты';
        break;

      case 'cardNumber':
        value = value.replace(/[^0-9]/gi, '');
        error = value ? null : 'Укажите номер карты';
        break;

      case 'cardExp':
        error = value ? null : 'Укажите дату окончания действия карты';
        break;

      default:
        break;
    }

    this.setState({
      [name]: { value, error }
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { cardName, cardNumber, cardExp, cardCvv } = this.state;
    let newState = {};
    let canSubmit = true;

    if (!cardName.value) {
      canSubmit = false;
      newState = {
        ...newState,
        cardName: {
          value: cardName.value,
          error: 'Укажите имя владельца карты'
        }
      };
    }

    if (cardNumber.value.length !== 16) {
      canSubmit = false;
      newState = {
        ...newState,
        cardNumber: {
          value: cardNumber.value,
          error: 'Номер карты должен состоять из 16 цифр'
        }
      };
    }

    if (cardExp.value.length !== 5) {
      canSubmit = false;
      newState = {
        ...newState,
        cardExp: {
          value: cardExp.value,
          error: 'Укажите корректную дату'
        }
      };
    }

    if (cardCvv.value.length !== 3) {
      canSubmit = false;
      newState = {
        ...newState,
        cardCvv: {
          value: cardCvv.value,
          error: 'CVV должен состоять из 3 цифр'
        }
      };
    }

    this.setState(state => {
      return {
        ...state,
        ...newState
      };
    });

    if (canSubmit) {
      const profile = {
        cardName: cardName.value,
        cardNumber: cardNumber.value,
        cardExp: cardExp.value,
        cardCvv: cardCvv.value
      };

      localStorage.setItem('profile', JSON.stringify(profile));
    }
  };

  render() {
    const { cardName, cardNumber, cardExp, cardCvv } = this.state;

    return (
      <div className={styles.container}>
        <Paper className={styles.paper}>
          <Typography variant="h4" color="inherit" align="center">
            Профиль
          </Typography>
          <form className={styles.form} onSubmit={this.handleSubmit} noValidate>
            <Typography variant="h6" color="inherit">
              Способ оплаты
            </Typography>
            <TextField
              type="text"
              label="Имя владельца"
              placeholder="Имя владельца"
              name="cardName"
              value={cardName.value}
              onChange={this.handleChange}
              helperText={cardName.error ? cardName.error : null}
              error={cardName.error ? true : false}
              margin="none"
              autoComplete="cc-name"
              fullWidth
              required
            />
            <NumberFormat
              customInput={TextField}
              label="Номер карты"
              placeholder="Номер карты"
              name="cardNumber"
              value={cardNumber.value}
              onChange={this.handleChange}
              helperText={cardNumber.error ? cardNumber.error : null}
              error={cardNumber.error ? true : false}
              margin="none"
              autoComplete="cc-number"
              fullWidth
              required
              format="#### #### #### ####"
            />
            <NumberFormat
              customInput={TextField}
              label="Дата окончания действия"
              placeholder="мм/гг"
              name="cardExp"
              value={cardExp.value}
              onChange={this.handleChange}
              helperText={cardExp.error ? cardExp.error : null}
              error={cardExp.error ? true : false}
              margin="none"
              autoComplete="cc-exp"
              fullWidth
              required
              format="##/##"
            />
            <NumberFormat
              type="password"
              customInput={TextField}
              label="CVV"
              placeholder="CVV"
              name="cardCvv"
              value={cardCvv.value}
              onChange={this.handleChange}
              helperText={
                cardCvv.error
                  ? cardCvv.error
                  : 'Последние три цифры на обороте карты'
              }
              error={cardCvv.error ? true : false}
              margin="none"
              autoComplete="cc-csc"
              fullWidth
              required
              format="###"
            />
            <Button
              type="submit"
              variant="contained"
              size="medium"
              color="primary"
            >
              Сохранить
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
)(ProfileForm);
