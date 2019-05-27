/* eslint-disable import/prefer-default-export */
import { ThemeContext } from '@emotion/core';
import { useContext } from 'react';
import { Furniture } from './assets';

export const useTheme = () => useContext(ThemeContext);

export const getRoomIcon = slug => ({
  salon: Furniture.Couch,
  kuchnia: Furniture.Kitchen,
  lazienka: Furniture.SingleBed,
})[slug];

export const getCategoryIcon = slug => ({
  krzesla: Furniture.DiningChair,
  biurka: Furniture.Desk,
  lustra: Furniture.Mirror,
  'stoliki-tv': Furniture.TvTable,
  sofy: Furniture.Sofa,
  lozka: Furniture.DoubleBed,
})[slug];
