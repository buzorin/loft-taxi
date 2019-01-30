import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAuthRequest } from '../../modules/auth';
import { getRoute } from '../../api';

import Map from '../Map';
import OrderTaxiForm from '../OrderTaxiForm';

class MapPage extends Component {
  state = {
    hasOrder: false,
    orderCoords: null
  };

  componentDidMount() {
    document.title = 'Карта | Loft Taxi';
  }

  makeOrder = (from, to) => {
    getRoute(from, to).then(orderCoords => {
      this.setState({
        hasOrder: true,
        orderCoords
      });
    });
  };

  clearForm = () => {
    this.setState({
      hasOrder: false,
      orderCoords: null
    });
  };

  render() {
    const { hasOrder, orderCoords } = this.state;

    return (
      <>
        <Map orderCoords={orderCoords} />
        <OrderTaxiForm
          hasOrder={hasOrder}
          makeOrder={this.makeOrder}
          clearForm={this.clearForm}
        />
      </>
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
)(MapPage);
