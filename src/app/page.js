'use client'

import Carousel from "./components/Carousel/Carousel";
import CatalogMini from "./components/CatalogMini/CatalogMini";
import DailyItem from "./components/DailyItem/DailyItem";
import Search from "./components/Search/Search";
import Footer from "./components/Footer/Footer.js";
import HotOffers from "./components/HotOffers/HotOffers";
import { useEffect, useState } from "react";

export default function Home({ children }) {
  const [clientToken,setClientToken] = useState('');
  const [badgesList,setBadgesList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [badgesLoaded, setBadgesLoaded] = useState(false);
  const [tokenLoaded, setTokenLoaded] = useState(false);

  useEffect(() => {
    if (badgesLoaded && tokenLoaded) {
      setLoading(false);
    }
  }, [badgesLoaded, tokenLoaded]);

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
    setBadgesLoaded(true);
  };

  useEffect(()=>{
    if(typeof window !== 'undefined'){
      let token = localStorage.getItem("token-SattyTatty")
      setClientToken(token)
      setTokenLoaded(true);
    }
  },[])

  useEffect(()=>{
    loadBadges();
  },[])

  return (
    <main>
        {
            loading ?
                (
                  <div className={"loader"}></div>
                ) :
                (
                    <>
                        <Carousel />
                        <Search placeholder={"Искать в Marketly"} />
                        <HotOffers />
                        <div style={{ paddingTop: 20 }} className="main-catalog">
                            {badgesList?.filter(badge => badge.showOnMainPage).map((badge)=>(
                                <CatalogMini badge={badge} />
                            ))}
                            {/*<DailyItem />*/}
                            <Footer />
                        </div>
                        {children}
                    </>
                )
        }

    </main>
  );
}
