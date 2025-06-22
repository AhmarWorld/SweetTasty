"use client";

import { useState, useEffect } from "react";
import CatalogItem from "../CatalogItem/CatalogItem";
import "./CatalogCarousel.css";
import {getCart} from "@/app/lib/basket";

function CatalogCarousel({badgeId, productsList}) {
  const [products, setProducts] = useState(productsList || []);
  const [clientToken,setClientToken] = useState('');
  const [cartItems, setCartItems] = useState([]);

  const [productsLoaded, setProductsLoaded] = useState(false);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [tokenLoaded, setTokenLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (productsLoaded && cartLoaded && tokenLoaded) {
      setLoading(false);
    }
  }, [productsLoaded, tokenLoaded, cartLoaded]);

  useEffect(() => {
    (async () => {
      if (clientToken) {
        const cartResponse = await getCart(clientToken);
        console.log("catalog cart", cartResponse);
        if (cartResponse.items) {
          setCartItems(cartResponse.items);
        }
      }
      setCartLoaded(true);
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
      setTokenLoaded(true);
    }
  },[])

  useEffect(()=>{
    if (!productsList) {
      loadProducts(clientToken);
    }
    setProductsLoaded(true);
  },[clientToken]);


  return (
    loading ?
    (
      <div className="loader"></div>
    ) :
    (
      <div className="catalog-carousel">
      {
        products?.length > 0 ?
          products?.map((product) => (
            <div key={product.id} style={products?.length > 1 ? { width: "60%" } : {}}>
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
    )
  );
}

export default CatalogCarousel;
