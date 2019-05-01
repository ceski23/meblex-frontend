import React from 'react';
import { useSelector } from 'react-redux';
import { SubmissionError } from 'redux-form';
import UserProfileForm from './UserProfileForm';
import * as API from '../../api';

import S from './UserProfile.module.scss';

const UserProfile = () => {
  const user = useSelector(state => state.auth.user);

  const updateUserProfile = async (values) => {
    // setIsLoading(true);
    try {
      await API.updateUserData(values);
    } catch (error) {
      Object.keys(error.errors).forEach((key) => {
        error.errors[key.toLowerCase()] = String(error.errors[key]);
        delete error.errors[key];
      });

      throw new SubmissionError({
        _error: error.title,
        ...error.errors,
      });
    }
    // setIsloading(false);
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
