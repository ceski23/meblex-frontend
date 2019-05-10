/* eslint-disable import/prefer-default-export */
import { ThemeContext } from '@emotion/core';
import { useContext } from 'react';

export const useTheme = () => useContext(ThemeContext);
