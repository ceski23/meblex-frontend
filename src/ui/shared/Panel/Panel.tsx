import React, { FC, ReactElement, ReactNode } from 'react';
import { styled } from 'theme';
import { Paper } from '../Paper';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 1.5em;
  margin-bottom: 20px;
`;

const StyledPaper = styled(Paper)`
  width: 100%;
`;

interface Props {
  title?: string | ReactNode;
  className?: string;
}

export const Panel: FC<Props> = ({ children, className, title }): ReactElement => (
  <Container className={className}>
    {title && <Title>{title}</Title>}
    <StyledPaper>
      {children}
    </StyledPaper>
  </Container>
);
