import React, { FC, ReactElement, ReactText } from 'react';
import { toast as toastify } from 'react-toastify';

import styled from 'styled-components/macro';
import { ReactComponent as ErrorIcon } from 'assets/notifications/error.svg';
import { ReactComponent as WarningIcon } from 'assets/notifications/warning.svg';
import { ReactComponent as InfoIcon } from 'assets/notifications/info.svg';
import { ReactComponent as SuccessIcon } from 'assets/notifications/success.svg';

const StyledIcon = styled.svg`
  width: 20px;
  height: 20px;
  margin-right: 20px;
  fill: #fff;
`;

type Type = 'error' | 'info' | 'warning' | 'success' | undefined;

const Icon = (type: Type): FC | undefined => {
  switch (type) {
    case 'error': return ErrorIcon;
    case 'warning': return WarningIcon;
    case 'success': return SuccessIcon;
    case 'info': return InfoIcon;
    default: return undefined;
  }
};

interface BodyProps {
  text: string;
  type?: Type;
}

const ToastBody: FC<BodyProps> = ({ text, type }): ReactElement => (
  <>
    {type && <StyledIcon as={Icon(type)} />}
    {text}
  </>
);

export const toast = (text: string, type?: Type): ReactText => {
  const content = <ToastBody text={text} type={type} />;
  switch (type) {
    case 'error': return toastify.error(content);
    case 'info': return toastify.info(content);
    case 'success': return toastify.success(content);
    case 'warning': return toastify.warn(content);
    default: return toastify(content);
  }
};
