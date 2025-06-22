"use client";

import CartItem from "../components/CartItem/CartItem";
import "./cart.css";
import CatalogMini from "../components/CatalogMini/CatalogMini";
import Footer from "../components/Footer/Footer";
import ProfileGeo from "../components/ProfileGeo/ProfileGeo";
import { getCart } from "../lib/basket";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import OrdersBunner from "@/app/components/OrdersBunner/OrdersBunner";
import { useRoot } from "../lib/store";

function Cart() {
  const [clientToken, setClientToken] = useState(undefined);
  const router = useRouter();

  const { setCart, cart } = useRoot();

  const [cartList, setCartList] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [isAuth, setIsAuth] = useState(true);

  const [totalSum, setTotalSum] = useState(Number());
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [orderAllowed, setOrderAllowed] = useState(false);
  const [hasAddress, setHasAddress] = useState(false);

  const [tokenLoaded, setTokenLoaded] = useState(false);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [recommendedProductsLoaded, setRecommendedProductsLoaded] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (cartLoaded && tokenLoaded && recommendedProductsLoaded) {
      setIsLoading(false);
    }
  }, [tokenLoaded, cartLoaded, recommendedProductsLoaded]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClientToken(localStorage.getItem("token-SattyTatty"));
      setTokenLoaded(true);
    }
  }, []);

  useEffect(() => {
    async function loadRecommendedProducts() {
      const request = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URL + "/badges/search?name=для корзины",
        {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "any",
          },
        }
      );

      const response = await request.json();
      console.log("for cart badge", response);
      setRecommendedProducts(response);
      setRecommendedProductsLoaded(true);
    }

    loadRecommendedProducts();
  }, []);

  async function deleteCart() {
    const request = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL + "/carts/" + cartId,
      {
        method: "DELETE",
        headers: {
          "ngrok-skip-browser-warning": "any",
          Authorization: "Bearer " + clientToken,
          "Content-type": "application/json",
        },
      }
    );
    if (request.ok) {
      setCartList([]);
      setCart([]);
      setTotalSum(0);
      // const data = await getCart(clientToken, setIsAuth);
      // if (data) {
      //   setCartList(data.items);
      //   setCartId(data.cartId);
      // }
    }
    return response;
  }

  useEffect(() => {
    if (!isAuth) {
      router.push("/profile/authentication");
    }
  }, [isAuth]);

  useEffect(() => {
    let newTotal = 0;
    if (cartList) {
      cartList.map((item) => {
        newTotal = newTotal + +item.price * +item.quantity;
        setTotalSum(newTotal);
      });
    }
  }, [cartList]);

  useEffect(() => {
    if (clientToken) {
      setTimeout(() => {
        (async function () {
          const data = await getCart(clientToken, setIsAuth);
          console.log("getCart page", data);
          if (data.success) {
            setCartList(data.items);
            setCartId(data.cartId);
          }
          setOrderAllowed(data.orderAllowed);
        })();
        setCartLoaded(true);
      }, 100);
    }
  }, [clientToken, cart]);

  useEffect(() => {
    const event = new CustomEvent("cartUpdate", { detail: cartList.length });
    window.dispatchEvent(event);
  }, [cartList]);

  useEffect(() => {
    if (clientToken) {
      async function checkAddress() {
        const request = await fetch(
          process.env.NEXT_PUBLIC_SERVER_URL + "/branches",
          {
            method: "GET",
            headers: {
              "ngrok-skip-browser-warning": "any",
              Authorization: "Bearer " + clientToken,
            },
          }
        );
        if (request.ok) {
          const userData = await request.json();
          setHasAddress(userData.length ? "true" : "false");
        }
      }
      checkAddress();
    }
  }, [clientToken]);

  return (
    <div className="cart">
      {!hasAddress && <ProfileGeo />}
      <OrdersBunner />
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <>
          <div style={{ marginTop: 20 }} className="cart-main">
            <p className="cart-main_title">
              <h2>
                Корзина: <b>{cartList.length ? cartList.length : 0}</b>
              </h2>
              <p onClick={deleteCart}>Очистить корзину</p>
            </p>
            {cartList.length ? (
              <div className="cart-list">
                {cartList.map((item) => {
                  return (
                    <CartItem
                      totalSum={totalSum}
                      setTotalSum={setTotalSum}
                      cartList={cartList}
                      setCartList={setCartList}
                      item={item}
                      key={item.id}
                    />
                  );
                })}
              </div>
            ) : (
              <p>В ваша корзина пуста...</p>
            )}
          </div>
          {cartList.length > 0 ? (
            orderAllowed ? (
              <Link href={"/cart/offer"} className="cart-offer">
                <p>Перейти к оформлению</p>
                <p>{totalSum} ₸</p>
              </Link>
            ) : (
              <div className="cart-offer" style={{ backgroundColor: "coral" }}>
                <p>
                  В данный момент <br /> прием заказов закрыт!
                </p>
              </div>
            )
          ) : null}
          {recommendedProducts.length > 0 && (
            <CatalogMini
              productsList={recommendedProducts}
              headingText={"Рекомендованные товары"}
            />
          )}
          <Footer />
        </>
      )}
    </div>
  );
}

export default Cart;
