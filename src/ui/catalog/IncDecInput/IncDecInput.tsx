import React, {
 FC, ReactElement, FormEvent,
} from 'react';
import styled from 'styled-components/macro';
import { Button } from 'ui/shared/Button';
import { transparentize } from 'polished';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  box-shadow: 6px 8px 30px 0px ${({ theme }) => transparentize(0.8, theme.colors.black)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 5px;
  overflow: hidden;
`;

const StyledInput = styled.input`
  border: none;
  padding: 10px 15px;
  color: ${({ theme }) => theme.colors.textDark};
  background: ${({ theme }) => theme.colors.backgroundGray};
  user-select: text;
  width: 100%;
  border-radius: 0;
  text-align: center;
  font-size: 1.5em;
  font-weight: bold;
`;

const StyledButton = styled(Button)`
  margin: 0;
  border-radius: 0;
  background: ${({ theme }) => theme.colors.backgroundGray};
  border-color: ${({ theme }) => theme.colors.backgroundGray};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.8em;
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundGray};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

interface Props {
  className?: string;
  value: number;
  setValue: (val: number) => void;
}

export const IncDecInput: FC<Props> = ({
  className, setValue, value,
}): ReactElement => {
  const handleChange = (event: FormEvent<HTMLInputElement>): void => {
    const val = parseInt(event.currentTarget.value, 10);
    if (!Number.isNaN(val) && val > 0) setValue(val);
  };

  const handleClick = (n: number): void => {
    if (n > 0) setValue(n);
  };

  return (
    <Container className={className}>
      <StyledButton onClick={() => handleClick(value - 1)}>-</StyledButton>
      <StyledInput
        value={value}
        onChange={handleChange}
        type="tel"
      />
      <StyledButton onClick={() => handleClick(value + 1)}>+</StyledButton>
    </Container>
  );
};
