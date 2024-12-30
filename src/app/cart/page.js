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

function Cart() {
  const [clientToken, setClientToken] = useState(undefined);
  const router = useRouter();

  const [cartList, setCartList] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [isAuth, setIsAuth] = useState(true);

  const [totalSum, setTotalSum] = useState(Number());
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [orderAllowed, setOrderAllowed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClientToken(localStorage.getItem("token-SattyTatty"));
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
            }
          }
      );

      const response = await request.json();
      setRecommendedProducts(response)
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
      (async function(){
        const data = await getCart(clientToken, setIsAuth);
        if (data.success) {
          console.log("setting cart items list", data.items);
          setCartList(data.items);
          setCartId(data.cartId);
        }
        setOrderAllowed(data.orderAllowed);
      })()
    }
  }, [clientToken]);

  useEffect(() => {
    const event = new CustomEvent('cartUpdate', { detail: cartList.length });
    window.dispatchEvent(event);
  }, [cartList]);

  return (
    <div className="cart">
      <OrdersBunner/>
      <ProfileGeo />
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
      {
        cartList.length ? (
            orderAllowed ? (
                <Link href={"/cart/offer"} className="cart-offer">
                  <p>Перейти к оформлению</p>
                  <p>{totalSum} ₸</p>
                </Link>
            ) : (
                <div className="cart-offer" style={{ backgroundColor: "coral" }}>
                  <p>В данный момент <br /> прием заказов закрыт!</p>
                </div>
            )
        ) : null
      }
      {recommendedProducts.length && (<CatalogMini productsList={recommendedProducts} headingText={"Рекомендованные товары"} />)}
      <Footer />
    </div>
  );
}

export default Cart;
