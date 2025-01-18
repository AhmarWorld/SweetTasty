import { Montserrat } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav/Nav";
import { TokenProvider } from './TokenContext';
import React from "react";

const montserrat = Montserrat({
  subsets: ["cyrillic", "latin"],
  weight: ["700", "500"],
});

export const metadata = {
  title: "Marketly",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <TokenProvider>
          {children}
          <Nav />
        </TokenProvider>
      </body>
    </html>
  );
}
