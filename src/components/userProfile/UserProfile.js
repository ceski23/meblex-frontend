/* eslint-disable no-param-reassign */
/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useSelector, useActions } from 'react-redux';
import { SubmissionError } from 'redux-form';
import UserProfileForm from './UserProfileForm';
import PasswordChangeForm from './PasswordChangeForm';
import EmailChangeForm from './EmailChangeForm';
import * as API from '../../api';

import { setUserData as setUserDataAction } from '../../redux/auth';

const UserProfile = () => {
  const user = useSelector(state => state.auth.user);
  const setUserData = useActions(data => setUserDataAction(data));

  const style = {
    userProfile: css`
      padding: 30px 20px;
    `,

    title: css`
      margin: 0;
      margin-bottom: 30px;
    `,

    subTitle: css`
      margin: 0;
      margin-bottom: 30px;
      padding-top: 70px;
    `,
  };

  const updateUserProfile = async (values) => {
    // setIsLoading(true);
    try {
      const userData = await API.updateUserData(values);
      console.log('UD;', userData);
      setUserData(userData);
    } catch (error) {
      throw new SubmissionError({
        _error: error.title,
        ...error.errors,
      });
    }
    // setIsloading(false);
  };

  const updatePassword = async (values) => {
    // setIsLoading(true);
    try {
      const { repeatPassword, ...data } = values;
      await API.updateUserPassword(data);
    } catch (error) {
      throw new SubmissionError({
        _error: error.title,
        ...error.errors,
      });
    }
    // setIsloading(false);
  };

  const updateEmail = async (values) => {
    // setIsLoading(true);
    try {
      await API.updateUserEmail(values);
    } catch (error) {
      throw new SubmissionError({
        _error: error.title,
        ...error.errors,
      });
    }
    // setIsloading(false);
  };

  return (
    <div css={style.userProfile}>
      <h3 css={style.title}>Twoje dane</h3>
      <UserProfileForm initialValues={user} onSubmit={updateUserProfile} />

      <h3 css={style.subTitle}>Zmiana adresu email</h3>
      <EmailChangeForm initialValues={{ newemail: user.email }} onSubmit={updateEmail} />

      <h3 css={style.subTitle}>Zmiana hasła</h3>
      <PasswordChangeForm onSubmit={updatePassword} />

      <h3 css={style.subTitle}>Historia zamówień</h3>
    </div>
  );
};

export default UserProfile;
