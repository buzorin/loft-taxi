const baseUrl = 'https://loft-taxi.glitch.me';

export const authorize = ({ login, password }) => {
  const url = `${baseUrl}/auth?username=${login}&password=${password}`;

  return fetch(url).then(response => response.json());
};

export const getAddressList = () => {
  const url = `${baseUrl}/addressList`;

  return fetch(url).then(response => response.json());
};

export const getRoute = (from, to) => {
  const url = `${baseUrl}/route?address1=${from}&address2=${to}`;

  return fetch(url).then(response => response.json());
};
