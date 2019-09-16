import styled from 'styled-components/macro';
import { transparentize } from 'polished';

export const Paper = styled.div`
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 1px 15px ${({ theme }) => transparentize(0.72, theme.colors.primaryDark)};
  border-radius: 5px;
  padding: 30px;
`;
