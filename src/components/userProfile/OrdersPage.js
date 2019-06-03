/* eslint-disable no-param-reassign */
/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useSelector } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { useState } from 'react';
import { toast } from 'react-toastify';
import UserProfileForm from './UserProfileForm';
import PasswordChangeForm from './PasswordChangeForm';
import EmailChangeForm from './EmailChangeForm';
import * as API from '../../api';

import { setUserData as setUserDataAction } from '../../redux/auth';

const OrdersPage = () => {
  const style = {
    userProfile: css`
      padding: 30px 20px;
    `,

    subTitle: css`
      margin: 0;
      margin-bottom: 30px;
    `,
  };

  return (
    <div css={style.userProfile}>
      <h3 css={style.subTitle}>Historia zamówień</h3>
    </div>
  );
};

export default OrdersPage;
