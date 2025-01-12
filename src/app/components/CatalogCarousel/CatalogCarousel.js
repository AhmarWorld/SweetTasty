"use client";

import { useState, useEffect } from "react";
import CatalogItem from "../CatalogItem/CatalogItem";
import "./CatalogCarousel.css";
import {getCart} from "@/app/lib/basket";

function CatalogCarousel({badgeId, productsList}) {
  const [products, setProducts] = useState(productsList || []);
  const [clientToken,setClientToken] = useState('');
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    (async () => {
      if (clientToken) {
        const cartResponse = await getCart(clientToken);
        if (cartResponse.items) {
          console.log("cart fetched", cartResponse.items);
          setCartItems(cartResponse.items);
        }
      }
    })();
  }, [clientToken]);

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
  },[])

  useEffect(()=>{
    loadProducts(clientToken);
  },[]);


  return (
    <div className="catalog-carousel">
      {
        products?.length ?
          products?.map((product) => (
            <div key={product.id} style={products?.length > 1 ? { maxWidth: "50%" } : {}}>
              <CatalogItem
                  key={product.id}
                  product={product}
                  cartItems={cartItems}
              />
            </div>
          )) :
          <div>Нет продуктов</div>
      }
    </div>
  );
}

export default CatalogCarousel;
