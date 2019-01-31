import React, { PureComponent } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './Map.module.scss';

const getRouteOpts = coordinates => ({
  id: 'route',
  type: 'line',
  source: {
    type: 'geojson',
    data: {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates
      }
    }
  },
  layout: {
    'line-join': 'round',
    'line-cap': 'round'
  },
  paint: {
    'line-color': '#c2423a',
    'line-width': 8
  }
});

class Map extends PureComponent {
  map = null;
  mapContainer = React.createRef();

  componentDidMount() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiYnV6b3JpbiIsImEiOiJjanJocWlxODIxaG1oNDNyazI2bzJkaW1mIn0.usIUpzEsbN1gugjS9A4MHA';
    this.map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [30.2656504, 59.8029126],
      zoom: 15
    });
  }

  componentDidUpdate() {
    const { orderCoords } = this.props;
    const mapHasLayer = this.map.getLayer('route');

    if (mapHasLayer) {
      this.map.removeLayer('route');
      this.map.removeSource('route');
    }

    if (orderCoords) {
      this.map.addLayer(getRouteOpts(orderCoords));
      this.map.fitBounds(
        [orderCoords[0], orderCoords[orderCoords.length - 1]],
        { padding: 100 }
      );
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return <div className={styles.mapContainer} ref={this.mapContainer} />;
  }
}

export default Map;
