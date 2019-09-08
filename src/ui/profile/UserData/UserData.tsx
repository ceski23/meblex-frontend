import React, { FC, ReactElement } from 'react';
import { Panel } from 'ui/shared/Panel';
import { styled, forTabletPortraitUp } from 'theme';
import { useSelector } from 'react-redux';
import { AppState } from 'store/types';
import { ADDRESS_DATA, EMAIL_ADDRESS, PASSWORD } from 'constants/Profile';
import { useReduxDispatch } from 'hooks';
import { updateUserData, updateEmail, updatePassword } from 'store/user/actions';
import { toast } from 'utils/toaster';
import { USER_DATA_UPDATE_SUCCESSFUL, EMAIL_UPDATE_SUCCESSFUL, PASSWORD_UPDATE_SUCCESSFUL } from 'constants/Api';
import { FormikActions } from 'formik';
import { defaultErrorHandler } from 'utils/apiErrorHandlers';
import { UserDataForm } from '../UserDataForm';
import { ChangeEmailForm } from '../ChangeEmailForm';
import { ChangePasswordForm } from '../ChangePasswordForm';
import { UserDataFormValues } from '../UserDataForm/UserDataForm';
import { ChangeEmailFormValues } from '../ChangeEmailForm/ChangeEmailForm';
import { ChangePasswordFormValues } from '../ChangePasswordForm/ChangePasswordForm';

const StyledPanel = styled(Panel)`
  margin: 40px;
  width: 100%;
  ${forTabletPortraitUp()} {
    width: 400px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

export const UserData: FC = (): ReactElement => {
  const { data } = useSelector(({ user }: AppState) => user);
  const dispatch = useReduxDispatch();

  const handleUpdateData = (
    values: UserDataFormValues, { setErrors }: FormikActions<UserDataFormValues>,
  ): void => {
    dispatch(updateUserData(values))
      .then(() => toast(USER_DATA_UPDATE_SUCCESSFUL, 'success'))
      .catch(error => defaultErrorHandler(error, setErrors));
  };

  const handleUpdateEmail = (
    values: ChangeEmailFormValues, { setErrors }: FormikActions<ChangeEmailFormValues>,
  ): void => {
    dispatch(updateEmail(values))
      .then(() => toast(EMAIL_UPDATE_SUCCESSFUL, 'success'))
      .catch(error => defaultErrorHandler(error, setErrors));
  };

  const handleUpdatePassword = (
    { repeatPassword, ...values }: ChangePasswordFormValues,
    { setErrors }: FormikActions<ChangePasswordFormValues>,
  ): void => {
    dispatch(updatePassword(values))
      .then(() => toast(PASSWORD_UPDATE_SUCCESSFUL, 'success'))
      .catch(error => defaultErrorHandler(error, setErrors));
  };

  return (
    <Container>
      <StyledPanel title={ADDRESS_DATA}>
        <UserDataForm onSubmit={handleUpdateData} initialValues={data.user} />
      </StyledPanel>
      <StyledPanel title={EMAIL_ADDRESS}>
        <ChangeEmailForm
          onSubmit={handleUpdateEmail}
          initialValues={data.user && {
            newEmail: data.user.email,
          }}
        />
      </StyledPanel>
      <StyledPanel title={PASSWORD}>
        <ChangePasswordForm onSubmit={handleUpdatePassword} />
      </StyledPanel>
    </Container>
  );
};
