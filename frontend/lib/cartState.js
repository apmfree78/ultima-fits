/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

const LocalStateContent = createContext();
const LocalStateProvider = LocalStateContent.Provider;

function CartStateProvider({ children }) {
  // This is our own custom provider!
  // We will store data (state) and functionality (updaters) in here
  // and anyone can access it via the consumer!

  const [cartOpen, setCartOpen] = useState(false);

  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  function closeCart() {
    setCartOpen(false);
  }

  function openCart() {
    setCartOpen(true);
  }

  return (
    <LocalStateProvider
      value={{ cartOpen, setCartOpen, openCart, closeCart, toggleCart }}
    >
      {children}
    </LocalStateProvider>
  );
}

// make a custom hook for accessing the cart local state
function useCart() {
  // we use a consumer here to access the local state
  const all = useContext(LocalStateContent);
  return all;
}
export { CartStateProvider, useCart };
