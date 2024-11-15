"use client";

import { useState, useEffect } from "react";
import CatalogItem from "../CatalogItem/CatalogItem";
import "./CatalogCarousel.css";

function CatalogCarousel() {
  const [products, setProducts] = useState([]);
  const clientToken = localStorage.getItem("token-SattyTatty");

  const loadProducts = async (token) => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL + "/products",
      {
        headers: {
          "ngrok-skip-browser-warning": "any",
          Authorization: "Bearer " + token,
        },
        method: "GET",
      }
    );
    const data = await response.json();
    setProducts(data);
  };

  useEffect(()=>{
    loadProducts(clientToken)
  },[])


  return (
    <div className="catalog-carousel">
      <CatalogItem/>
      <CatalogItem/>
      <CatalogItem/>
      <CatalogItem/>
      <CatalogItem/>
      <CatalogItem/>
      {products.map((product) => (
          <CatalogItem
            img={product.image}
            key={product.id}
            id={product.id}
            text={product.name}
            price={product.price}
            sell={product.oldPrice}
            rating={product.rating}
            reviewsCount={product.reviewsCount}
          />
      ))}
    </div>
  );
}

export default CatalogCarousel;
