import { useState, useEffect } from 'react';
import { theme } from 'theme';
import { RuleFnType } from 'styled-breakpoints';

export const useMediaQuery = (rule: RuleFnType): boolean => {
  const [match, setMatch] = useState(false);
  const query = rule({ theme }).replace('@media ', '');

  useEffect(() => {
    const updateMatch = (): void => setMatch(window.matchMedia(query).matches);
    updateMatch();
    window.matchMedia(query).addEventListener('change', updateMatch);
    return () => {
      window.matchMedia(query).removeEventListener('change', updateMatch);
    };
  }, [query]);

  return match;
};
