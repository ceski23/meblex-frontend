/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomSizeForm from './CustomSizeForm';


const CustomSizeRequestPage = ({ location: { state } }) => {
  const [formLoading, setFormLoading] = useState(false);

  const style = {
    proposal: css`
      padding: 30px 20px;
    `,

    title: css`
      margin: 0;
      margin-bottom: 30px;
    `,
  };

  const handleSubmit = (values) => {
    setFormLoading(true);
    toast('Success Notification !');
    setFormLoading(false);
  };

  return (
    <React.Fragment>
      {state ? (
        <div css={style.proposal}>
          <h3 css={style.title}>Formularz niestandardowego rozmiaru</h3>
          <CustomSizeForm
            item={state.item}
            isLoading={formLoading}
            onSubmit={handleSubmit}
          />
        </div>
      ) : <Redirect to="/" />}
    </React.Fragment>
  );
};

export default CustomSizeRequestPage;
