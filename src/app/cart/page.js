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

function Cart() {
  const clientToken = localStorage.getItem("token-SattyTatty");
  const router = useRouter();

  const [cartList, setCartList] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [isAuth, setIsAuth] = useState(true);

  const [totalSum, setTotalSum] = useState(Number());

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

  useState(async () => {
    const data = await getCart(clientToken, setIsAuth);
    if (data.success) {
      setCartList(data.items);
      setCartId(data.cartId);
    }
  }, []);

  return (
    <div className="cart">
      <ProfileGeo />
      <div className="cart-main">
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
      <Link href={"/cart/offer"} className="cart-offer">
        <p>Перейти к оформлению</p>
        <p>{totalSum} ₸</p>
      </Link>
      <Footer />
    </div>
  );
}

export default Cart;
