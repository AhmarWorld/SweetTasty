"use client";
import React, { useState } from "react";

export default function CartProvider({ children }) {
  const CartContext = React.createContext({});
  const [cartIcon, setCartIcon] = useState(0);
  return (
    <CartContext.Provider value={{ cartIcon, setCartIcon }}>
      {children}
    </CartContext.Provider>
  );
}
