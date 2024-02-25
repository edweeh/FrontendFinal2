// CartContext.js

import React, { createContext, useContext, useReducer } from 'react';

// Define the initial state
const initialState = {
  cartItems: [],
};

// Create a context
const CartContext = createContext();

// Create a reducer function to handle state changes
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    // Add more cases for other actions if needed
    default:
      return state;
  }
};

// Create a CartProvider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Function to add items to the cart
  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  return (
    <CartContext.Provider value={{ state, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context; // Change from CartContext to context
};
