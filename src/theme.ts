import { down, RuleFnType, up } from 'styled-breakpoints';

export const theme = {
  colors: {
    primary: 'rgb(0, 105, 255)',
    primaryDark: 'rgb(4, 35, 101)',
    backgroundGray: 'rgb(243, 245, 249)',
    background: 'rgb(255, 255, 255)',

    text: 'rgba(4, 35, 101, 0.7)',
    textDark: 'rgb(4, 35, 101)',
    shadow: 'rgba(4, 35, 101, 0.06)',
    shadowDark: 'rgba(4, 35, 101, 0.22)',
    hover: 'rgb(0, 84, 204)',

    border: 'rgb(229, 232, 237)',
    white: 'rgb(255, 255, 255)',
  },
  breakpoints: {
    phone: '599px',
    tabletPortrait: '600px',
    tabletLandscape: '800px',
    desktop: '1200px',
    bigDesktop: '1800px',
  },
};

export const forPhoneOnly = (): RuleFnType => down('phone');
export const forTabletPortraitUp = (): RuleFnType => up('tabletPortrait');
export const forTabletLandscapeUp = (): RuleFnType => up('tabletLandscape');
export const forDesktopUp = (): RuleFnType => up('desktop');
export const forBigDesktopUp = (): RuleFnType => up('bigDesktop');

export type Theme = typeof theme;
