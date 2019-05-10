/* eslint-disable import/prefer-default-export */
import { css } from '@emotion/core';

const breakpointUp = (size, content) => css`
  @media (min-width: ${size}px) {
    ${content}
  }
`;

const breakpointUpTo = (size, content) => css`
  @media (max-width: ${size}px) {
    ${content}
  }
`;

export const forPhoneOnly = content => breakpointUpTo(599, content);
export const forTabletPortraitUp = content => breakpointUp(600, content);
export const forTabletLandscapeUp = content => breakpointUp(800, content);
export const forDesktopUp = content => breakpointUp(1200, content);
export const forBigDesktopUp = content => breakpointUp(1800, content);


export const theme = {
  colors: {
    primary: 'rgb(0, 105, 255)',
    primaryDark: 'rgb(4, 35, 101)',
    backgroundGray: 'rgb(243, 245, 249)',
    gray: 'rgb(208, 211, 216)',
    background: 'rgb(255, 255, 255)',

    text: 'rgba(4, 35, 101, 0.7)',
    textDark: 'rgb(4, 35, 101)',
    shadow: 'rgba(4, 35, 101, 0.06)',
    shadowDark: 'rgba(4, 35, 101, 0.22)',
    hover: 'rgb(0, 84, 204)',
  },
};
