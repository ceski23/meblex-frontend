import React, { FC, ReactElement } from 'react';
import HikingTraveller from 'assets/images/hiking_traveller.svg';
import { history } from 'utils/history';
import { styled, forTabletPortraitUp } from 'theme';
import { Button } from 'ui/shared/Button';
import { PAGE_NOT_FOUND, WHAT_TO_DO, GO_BACK } from 'constants/PageNotFound';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  justify-content: center;
  width: 80%;
  align-self: center;
  margin: 0 auto;
`;

const Image = styled.img`
  width: 80%;
  margin-bottom: 50px;
  ${forTabletPortraitUp()} {
    width: 340px;
  }
`;

const Text = styled.h3`
  margin-bottom: 10px;
  text-align: center;
  font-size: 1.5em;
  ${forTabletPortraitUp()} {
    font-size: 1.7em;
  }
`;

const StyledButton = styled(Button)`
  margin-top: 50px;
`;

export const PageNotFound: FC = (): ReactElement => {
  const handleClick = (): void => history.goBack();

  return (
    <Container>
      <Image src={HikingTraveller} alt={PAGE_NOT_FOUND} />
      <Text>{PAGE_NOT_FOUND}</Text>
      <span>{WHAT_TO_DO}</span>
      <StyledButton onClick={handleClick}>{GO_BACK}</StyledButton>
    </Container>
  );
};
