import posed from 'react-pose';
import styled from 'styled-components/macro';

const Fade = posed.div({
  enter: {
    opacity: 1,
    delay: 300,
    beforeChildren: true,
  },
  exit: { opacity: 0 },
});

export const FadeAnimation = styled(Fade)`
  flex: 1;
  display: flex;
`;
