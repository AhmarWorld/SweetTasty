"use client";

import { useState, useEffect } from "react";
import CatalogItem from "../CatalogItem/CatalogItem";
import "./CatalogCarousel.css";

function CatalogCarousel({badgeId, productsList}) {
  const [products, setProducts] = useState(productsList || []);
  const [clientToken,setClientToken] = useState('')

  const loadProducts = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL + "/badges/" + badgeId,
      {
        headers: {
          "ngrok-skip-browser-warning": "any",
          Authorization: "Bearer " + clientToken,
        },
        method: "GET",
      }
    );
    const data = await response.json();
    setProducts(data.products);
  };

  useEffect(()=>{
    if(typeof window !== 'undefined'){
      let token = localStorage.getItem("token-SattyTatty")
      setClientToken(token)
    }
  },[window])

  useEffect(()=>{
    if (badgeId) {
      loadProducts(clientToken)
    }
  },[])


  return (
    <div className="catalog-carousel">
      {products?.map((product) => (
          <CatalogItem
            product={product}
          />
      ))}
    </div>
  );
}

export default CatalogCarousel;
