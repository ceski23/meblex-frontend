import React from 'react';
import { useSelector } from 'react-redux';
import UserProfileForm from './UserProfileForm';

import S from './UserProfile.module.scss';

const UserProfile = () => {
  const user = useSelector(state => state.auth.user);

  return (
    <div className={S.userProfile}>
      <h2 className={S.title}>Twój profil</h2>

      <UserProfileForm initialValues={user} />
    </div>
  );
};

export default UserProfile;
