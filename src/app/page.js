'use client'

import Carousel from "./components/Carousel/Carousel";
import CatalogMini from "./components/CatalogMini/CatalogMini";
import DailyItem from "./components/DailyItem/DailyItem";
import Search from "./components/Search/Search";
import Footer from "./components/Footer/Footer.js";
import HotOffers from "./components/HotOffers/HotOffers";
import { useEffect, useState } from "react";

export default function Home({ children }) {
  const [clientToken,setClientToken] = useState('')
  const [badgesList,setBadgesList] = useState([])

  const loadBadges = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL + "/badges",
      {
        headers: {
          "ngrok-skip-browser-warning": "any",
          Authorization: "Bearer " + clientToken,
        },
        method: "GET",
      }
    );
    const data = await response.json();
    setBadgesList(data);
  };

  useEffect(()=>{
    if(typeof window !== 'undefined'){
      let token = localStorage.getItem("token-SattyTatty")
      setClientToken(token)
    }
  },[window])

  useEffect(()=>{
    loadBadges()
  },[])

  return (
    <main>
      <Carousel />
      <Search placeholder={"Искать в SweetTasty"} />
      <HotOffers />
      <div className="main-catalog">
        {badgesList.map((badge)=>(
          <CatalogMini badge={badge} />
        ))}
        <DailyItem />
        <Footer />
      </div>
      {children}
    </main>
  );
}
