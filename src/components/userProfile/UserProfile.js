import React from 'react';
import { useSelector } from 'react-redux';
import { SubmissionError } from 'redux-form';
import UserProfileForm from './UserProfileForm';

import S from './UserProfile.module.scss';

const UserProfile = () => {
  const user = useSelector(state => state.auth.user);

  const updateUserProfile = (values) => {
    throw new SubmissionError({
      _error: 'Jeszce nie jest gotowe',
    });
  };

  return (
    <div className={S.userProfile}>
      <h3 className={S.title}>Twój profil</h3>
      <UserProfileForm initialValues={user} onSubmit={updateUserProfile} />

      <h3 className={S.subTitle}>Historia zamówień</h3>
    </div>
  );
};

export default UserProfile;
