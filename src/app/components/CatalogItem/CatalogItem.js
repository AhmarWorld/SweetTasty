"use client";

import { useEffect, useState } from "react";
import "./CatalogItem.css";
import { AiOutlinePlus } from "react-icons/ai";
import { FaMinus, FaPlus, FaStar } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { addBasket } from "../../lib/basket";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useRoot } from "@/app/lib/store";

function CatalogItem({ product, cartItems }) {
  const router = useRouter();

  const [clientToken, setClientToken] = useState("");
  const [count, setCount] = useState(
    cartItems?.find((p) => p.id === product.id)?.quantity || 0
  );
  const [counterOn, setCounterOn] = useState(false);
  const [cartId, setCartId] = useState(null);

  const [isAuth, setIsAuth] = useState(true);

  const { removeFromCart, addToCart } = useRoot();

  useEffect(() => {
    if (!isAuth) {
      router.push("/profile/authentication");
    }
  }, [isAuth]);

  const cartEdit = async (quantity) => {
    addBasket(product.id, product.price, quantity, clientToken, setCartId);
  };

  const deleteItem = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL + "/cartItems/" + cartId,
      {
        method: "DELETE",
        headers: {
          "ngrok-skip-browser-warning": "any",
          Authorization: "Bearer " + clientToken,
          "Content-type": "application/json",
        },
      }
    );
    const data = await request.json();
    if (!response.ok) {
      // alert("Авторизуйтесь на сайте");
    }
  };

  const onClickMin = () => {
    let newCount = 1;
    newCount = Number(count) - 1;
    setCount(newCount);
    if (newCount == 0) {
      deleteItem();
    } else {
      cartEdit(newCount);
    }
    removeFromCart(product);
  };

  const onClickPlus = () => {
    let newCount = 0;
    newCount = Number(count) + 1;
    setCount((prev) => prev + 1);
    cartEdit(newCount);
    setCounterOn(true);
    addBasket(product.id, product.price, newCount, clientToken, setCartId);
    addToCart(product);
  };

  useEffect(() => {
    if (count >= 1) {
      setCounterOn(true);
    } else if (count < 1) {
      setCounterOn(false);
    }
  }, [count]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClientToken(localStorage.getItem("token-SattyTatty"));
    }
  }, []);

  return (
    <div className="item-card">
      <Link className="item-card_link" href={`/catalog/${product?.id}`}>
        <div className="item-card_img">
          <div className="item-card_badges">
            {product.rating ? (
              <span className="item-card_rating-text">
                {product.rating.toFixed(1)}
              </span>
            ) : (
              <span></span>
            )}
            <div className="item-card_badges-col">
              {product.isNew && (
                <span
                  style={{ borderRadius: "0 50px 50px 0" }}
                  className="item-card_new-text"
                >
                  New
                </span>
              )}
              {product.oldPrice && (
                <span
                  style={{ borderRadius: "0 50px 50px 0" }}
                  className="item-card_sell-text"
                >
                  -15%
                </span>
              )}
              <span className="item-card_friends-text">Для вас</span>
            </div>
          </div>
          <img
            src={process.env.NEXT_PUBLIC_SERVER_URL + product.image}
            alt={product.name}
          />
        </div>
        <div className="item-card_rating">
          <div className="rating-stars">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={
                  index < Math.round(product.rating)
                    ? "star-filled"
                    : "star-empty"
                }
              />
            ))}
          </div>
          <span className="reviews-count">({product.reviewsCount})</span>
        </div>
        <div className="item-card_title">
          <b style={{ display: "block", height: 52, alignContent: "center" }}>
            {product.name}
          </b>
          <p className="currency">{product.providerName}</p>
          <p>{product.salesCount} продаж</p>
        </div>
        <div className="price">
          <span>{product.price} ₸</span>
          {product.oldPrice && (
            <span className="price-sell">{product.oldPrice} ₸</span>
          )}
        </div>
      </Link>
      {counterOn ? (
        <div className="cart-item_count">
          <div onClick={onClickMin} className="item_count-min">
            {count - 1 ? (
              <FaMinus color="#fff" size={16} />
            ) : (
              <MdDeleteForever color="#fff" size={16} />
            )}
          </div>
          <span>{count} шт</span>
          <div onClick={onClickPlus} className="item_count-plus">
            <FaPlus color="#fff" size={16} />
          </div>
        </div>
      ) : (
        <div onClick={onClickPlus} className="item-card_button">
          <span>Добавить</span>
          <AiOutlinePlus size={16} color="black" />
        </div>
      )}
    </div>
  );
}

export default CatalogItem;
