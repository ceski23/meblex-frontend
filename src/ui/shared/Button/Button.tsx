import React, { FC, ReactElement, ButtonHTMLAttributes } from 'react';

import { theme as appTheme } from 'theme';
import styled from 'styled-components/macro';
import { transparentize } from 'polished';
import Spinner from 'react-spinner-material';

interface Props {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  isLoading?: boolean;
}

const StyledButton = styled.button<Props>`
  border-radius: 5px;
  background: ${({ theme, variant }) => (variant === 'secondary' ? 'none' : theme.colors.primary)};
  color: ${({ theme, variant }) => (variant === 'secondary' ? theme.colors.primary : theme.colors.white)};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  padding: 15px 30px;
  font-size: 1.2em;
  font-weight: bold;
  cursor: pointer;
  margin: 10px;
  transition: .3s;
  text-decoration: none;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  align-self: center;
  justify-content: center;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  
  &:hover {
    background: ${({ theme, variant }) => (variant === 'secondary' ? transparentize(0.9, theme.colors.primary) : theme.colors.hover)};
  }
`;

const Wrapper = styled.div`
  padding-left: 20px;
`;

export const Button: FC<Props & ButtonHTMLAttributes<HTMLButtonElement>> = ({
  variant = 'primary', children, isLoading, ...props
}): ReactElement => (
  <StyledButton variant={variant} {...props}>
    {children}
    {isLoading && (
      <Wrapper>
        <Spinner
          size={25}
          spinnerColor={variant === 'secondary' ? appTheme.colors.primary : appTheme.colors.white}
          spinnerWidth={2}
          visible
        />
      </Wrapper>
    )}
  </StyledButton>
);
