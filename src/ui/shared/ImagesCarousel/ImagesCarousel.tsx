import React, {
 FC, ReactElement, useRef, useEffect, useState,
} from 'react';
import styled from 'styled-components/macro';
import { forTabletLandscapeUp } from 'theme';
import { transparentize } from 'polished';
import Flicking from '@egjs/flicking';
import { useMediaQuery } from 'hooks';


const Image = styled.div`
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 20px;
  width: 300px;
  height: 300px;
  box-shadow: 6px 8px 30px 0px ${({ theme }) => transparentize(0.8, theme.colors.black)};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  ${forTabletLandscapeUp()} {
    width: 70%;
  }
`;

const Carousel = styled.div`
  display: flex;
  height: 380px;
  align-items: center;

  & .eg-flick-camera {
    align-items: center;
    display: flex;
  }
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
`;

const Dot = styled.input`
  width: 20px;
  height: 20px;
  margin: 10px;
  cursor: pointer;
  &::after {
    display: block;
    content: '';
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.backgroundGray};
    border-radius: 50%;
    box-shadow: 1px 1px 5px ${({ theme }) => theme.colors.shadowDark};
    transition: all .3s;
  }
  &:checked::after {
    background: ${({ theme }) => theme.colors.primary};
  }
`;

export interface ImageData {
  url: string;
}

interface Props {
  images: ImageData[];
  name: string;
}

export const ImagesCarousel: FC<Props> = ({
  images, name,
}): ReactElement => {
  const carousel = useRef<HTMLDivElement>(null);
  const flicking = useRef<Flicking>();
  const dots = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldRenderDots = useMediaQuery(forTabletLandscapeUp());

  useEffect(() => {
    if (dots.current) {
      const dot = dots.current.children[currentIndex] as HTMLInputElement;
      dot.checked = true;
    }
    if (flicking.current) {
      const duration = Math.abs(currentIndex - flicking.current.getIndex()) * 300;
      flicking.current.moveTo(currentIndex, duration);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (carousel.current) {
      flicking.current = new Flicking(carousel.current, {
        collectStatistics: false,
        gap: 30,
        zIndex: 1,
        bounce: 100,
        duration: 300,
        autoResize: true,
      });
      flicking.current.on('moveEnd', ({ index }) => setCurrentIndex(index));
    }
  }, []);

  return (
    <Container>
      <Carousel ref={carousel}>
        {images.map(({ url }) => (
          <Image
            key={url}
            style={{ backgroundImage: `url(${url})` }}
          />
        ))}
      </Carousel>
      {shouldRenderDots && (
        <Dots ref={dots}>
          {images.map(({ url }, i) => (
            <Dot
              onClick={() => setCurrentIndex(i)}
              key={url}
              type="radio"
              name={name}
            />
        ))}
        </Dots>
      )}
    </Container>
  );
};
