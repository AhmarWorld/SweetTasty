import { Montserrat } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav/Nav";
import React from "react";

const montserrat = Montserrat({
  subsets: ["cyrillic", "latin"],
  weight: ["700", "500"],
});

export const metadata = {
  title: "Satty Tatty",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        {children}
        <Nav />
      </body>
    </html>
  );
}
