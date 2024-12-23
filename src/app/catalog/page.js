"use client";

import {useEffect, useState} from "react";
import CatalogSection from "../components/CatalogSection/CatalogSection";
import Footer from "../components/Footer/Footer";
import Search from "../components/Search/Search";
import "./catalog.css";
import HotOffers from "../components/HotOffers/HotOffers";
import OrdersBunner from "../components/OrdersBunner/OrdersBunner";

export default function Catalog() {
    const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const [clientToken, setClientToken] = useState(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClientToken(localStorage.getItem("token-SattyTatty"));
    }
  }, [window]);

  const getCat = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL + "/categories",
      {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "any",
          Authorization: "Bearer " + clientToken,
          "Content-type": "application/json",
        },
      }
    );
    const data = await response.json()
    if(!response.ok){
      alert('Авторизуйтесь на сайте')
      setIsAuth(false)
    }else if(response.ok){
      setCategories(data)
    }
  };

  useState(()=>{
    getCat()
  },[])

    useEffect(()=>{
        setTimeout(() => setLoading(false), 1000);
    },[])

  return loading ?
    (
        <div className={"loaderContainer"}>
            <div className={"loader"}></div>
        </div>
    ) :
    (
        <div className="main-catalog_page">
          <OrdersBunner/>
          <Search placeholder="Искать в SweetTasty" />
          <HotOffers/>
          <div className="catalog">
            {categories.map((subCat)=>(
              <CatalogSection title={subCat.name} subCat={subCat.subCategories}/>
            ))}
          </div>

          <Footer />
        </div>
    );
}
