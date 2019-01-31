import React, { Component } from 'react';

import ProfileForm from '../ProfileForm';

class ProfilePage extends Component {
  componentDidMount() {
    document.title = 'Профиль | Loft Taxi';
  }

  render() {
    return <ProfileForm />;
  }
}

export default ProfilePage;
