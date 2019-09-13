import React, { ReactElement } from 'react';
import { ToastContainer, ToastContainerProps } from 'react-toastify';

import { styled } from 'theme';

const WrappedToastContainer = ({
  className, ...rest
}: ToastContainerProps & { className?: string }): ReactElement => (
  <div className={className}>
    <ToastContainer {...rest} />
  </div>
);

export const Toaster = styled(WrappedToastContainer).attrs({
  className: 'Toastify__toast-container',
  toastClassName: 'Toastify__toast',
  bodyClassName: 'Toastify__toast-body',
  progressClassName: 'Toastify__progress-bar',
})`
  .Toastify__toast-container {
    padding: 10px;
  }

  .Toastify__toast {
    border-radius: 5px;
    box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12);
    min-height: 48px;
    padding: 15px 20px;
    margin-top: 16px;
    font-size: .9em;
    display: flex;
    flex-direction: row;
  }

  .Toastify__toast--default {
    background: #313131;
    color: #fff;
  }

  .Toastify__toast--error {
    background: #d32f2f;
  }

  .Toastify__toast--warning {
    background: #ffa000;
  }

  .Toastify__toast--success {
    background: #43a047;
  }

  .Toastify__toast--info {
    background: #2979ff;
  }

  .Toastify__close-button {
    align-self: center;
    color: #fff;
  }

  .Toastify__toast-body {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .Toastify__progress-bar {
    bottom: -1px;
  }
`;
