"use client";
import { createContext, useContext, useState } from 'react';

// Create the context
const TokenContext = createContext(null);

// Create a provider component
export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    // Context value includes the token and a method to update it
    const value = { token, setToken };

    return <TokenContext.Provider value={value}>{children}</TokenContext.Provider>;
};

// Custom hook for easier usage
export const useToken = () => useContext(TokenContext);