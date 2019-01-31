import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getAddressList } from '../../api';

import styles from './OrderTaxiForm.module.scss';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SelectField from '../SelectField';
import Button from '@material-ui/core/Button';

class OrderTaxiForm extends Component {
  state = {
    from: null,
    to: null,
    addressListFrom: [],
    addressListFromIsLoading: true,
    addressListTo: [],
    addressListToIsLoading: true
  };

  componentDidMount() {
    getAddressList().then(({ addresses }) => {
      const addressList = this.mapAddressListToOptions(addresses);

      this.setState({
        addressListFrom: addressList,
        addressListFromIsLoading: false,
        addressListTo: addressList,
        addressListToIsLoading: false
      });
    });
  }

  mapAddressListToOptions = addressList => {
    return addressList.map(address => ({
      value: address,
      label: address
    }));
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { from, to } = this.state;
    const { makeOrder } = this.props;

    if (!from || !to) {
      return;
    }

    makeOrder(from.value, to.value);
  };

  handleOrderMadeSubmit = e => {
    e.preventDefault();

    const { clearForm } = this.props;

    this.setState({
      from: null,
      to: null
    });

    clearForm();
  };

  renderOrderForm = () => {
    const {
      from,
      to,
      addressListFromIsLoading,
      addressListFrom,
      addressListToIsLoading,
      addressListTo
    } = this.state;

    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <Typography variant="h4" color="inherit">
          Вызов такси
        </Typography>
        <SelectField
          isLoading={addressListFromIsLoading}
          name="from"
          options={addressListFrom.filter(address => address !== to)}
          value={from}
          placeholder="Выберите адрес отправления"
          required
          onChange={this.handleChange}
        />
        <SelectField
          isLoading={addressListToIsLoading}
          name="to"
          options={addressListTo.filter(address => address !== from)}
          value={to}
          placeholder="Выберите адрес прибытия"
          required
          onChange={this.handleChange}
        />
        <Button
          type="submit"
          variant="outlined"
          size="medium"
          color="primary"
          disabled={!from || !to}
        >
          Вызвать такси
        </Button>
      </form>
    );
  };

  renderOrderMade = () => {
    return (
      <form className={styles.form} onSubmit={this.handleOrderMadeSubmit}>
        <Typography variant="h4" color="inherit">
          Заказ размещён
        </Typography>
        <Typography variant="body2" color="inherit">
          Ваше такси уже едет к вам. Прибудет приблизительно через 10 минут.
        </Typography>
        <Button type="submit" variant="outlined" size="medium" color="primary">
          Сделать новый заказ
        </Button>
      </form>
    );
  };

  renderNeedProfile = () => {
    return (
      <div className={styles.form}>
        <Typography variant="h4" color="inherit">
          Заполните платежные данные
        </Typography>
        <Typography variant="body2" color="inherit">
          Укажите информацию о банковской карте, чтобы сделать заказ.
        </Typography>
        <Button
          component={Link}
          to="/profile"
          variant="outlined"
          size="medium"
          color="primary"
        >
          Перейти в профиль
        </Button>
      </div>
    );
  };

  render() {
    const { hasOrder } = this.props;
    const hasProfile = localStorage.getItem('profile');

    return (
      <Paper className={styles.paper}>
        {hasOrder
          ? this.renderOrderMade()
          : hasProfile
          ? this.renderOrderForm()
          : this.renderNeedProfile()}
      </Paper>
    );
  }
}

export default OrderTaxiForm;
