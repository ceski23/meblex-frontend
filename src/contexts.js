import React from 'react'

export const TestContext = React.createContext({
  cartCount: 0,
  incrementCart: () => {},
  toggleNavigation: () => {}
});