"use client";

import Footer from "@/app/components/Footer/Footer";
import "./CatalogItem.css";
import { useEffect, useState } from "react";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import {addBasket, getCart} from "@/app/lib/basket";
import OrdersBunner from "@/app/components/OrdersBunner/OrdersBunner";
import HotOffers from "@/app/components/HotOffers/HotOffers";
import Search from "@/app/components/Search/Search";
import { FaStar } from "react-icons/fa";

export default function CatalogItem({ params }) {
  const [product, setProduct] = useState({});
  const [offerOn, setOfferOn] = useState(false);
  const [cartId, setCartId] = useState(null);

  const [newPrice, setNewPrice] = useState(product.price);
  const [count, setCount] = useState(1);

  const [clientToken, setClientToken] = useState(undefined);

  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    (async () => {
      if (clientToken) {
        const cartResponse = await getCart(clientToken);
        if (cartResponse.items) {
          setCount(cartResponse.items.find(item => item.id === product.id)?.quantity || 0);
        }
      }
    })();
  }, [clientToken, product]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClientToken(localStorage.getItem("token-SattyTatty"));
    }
  }, []);

  const getProduct = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL + `/products/${params.id}`,
      {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "any",
          Authorization: "Bearer " + clientToken,
          "Content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      alert("Авторизуйтесь на сайте");
      setIsAuth(false);
    } else if (response.ok) {
      setProduct(data);
    }
  };

  const getReviews = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URL + `/productReviews/product/${params.id}`,
        {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "any",
            Authorization: "Bearer " + clientToken,
            "Content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setReviews(data);
        const avgRating = data.reduce((acc, review) => acc + review.rating, 0) / data.length;
        setAverageRating(avgRating || 0);
      }
    } catch (error) {
      console.error("Ошибка при получении отзывов:", error);
    }
  };

  const onClickMin = () => {
    let newCount = 1;
    if (count > 1) {
      newCount = Number(count) - 1;
      setCount(newCount);
      setNewPrice(Number(newCount) * Number(product.price));
    } else {
      setCount(1);
    }
  };

  const onClickPlus = () => {
    let newCount = 1;
    if (count >= 1) {
      newCount = Number(count) + 1;
      setCount(newCount);
      setNewPrice(Number(newCount) * Number(product.price));
    }
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
    if (response.ok) {
      alert("Авторизуйтесь на сайте");
    }
  };

  useEffect(() => {
    getProduct();
    getReviews();
  }, []);

  return (
    <div className="catalog-item">
      <OrdersBunner />
      <HotOffers/>
      <Search placeholder={'Искать в Marketly'} />
      <div className="catalog-item_main">
        <img
          src={process.env.NEXT_PUBLIC_SERVER_URL + product.image}
        />
        {/* <img src={process.env.NEXT_PUBLIC_SERVER_URL + product.image} /> */}
        <h1> {product.name}</h1>
        <div className="product-rating">
          <a href="#reviews" className="product-rating_link">
            <div className="product-rating_stars">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={index < averageRating ? "star-filled" : "star-empty"}
                />
              ))}
            </div>
            <span className="product-rating_count">
              {reviews.length > 0 ? `(${reviews.length} отзывов)` : 'Нет отзывов'}
            </span>
          </a>
        </div>
        {reviews.length > 0 && (
          <div id="reviews" className="product-reviews">
            <h3>Отзывы покупателей</h3>
            {reviews.map((review) => (
              <div key={review.id} className="product-review_item">
                <div className="product-review_header">
                  <div className="product-review_stars">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={index < review.rating ? "star-filled" : "star-empty"}
                      />
                    ))}
                  </div>
                  <span className="product-review_date">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {review.comment && (
                  <p className="product-review_comment">{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        )}
        <div className="item_main-discription">
          <h3>Описание</h3>
          <p>Срок годности: {product.expirationDate}</p>
          <p>Температура хранения: {product.temperature}</p>
          <h3>Состав</h3>
          <p>{product.compound}</p>
          {/* <h3>Поставщик</h3>
          <p>{product.providerName}</p> */}
        </div>
      </div>
      <div className="item-page_offer">
        {offerOn ? (
          <>
            {count == 1 ? (
              <MdDeleteForever
                onClick={() => {
                  setOfferOn(false);
                  deleteItem();
                }}
              />
            ) : (
              <FaMinus
                onClick={() => {
                  onClickMin();
                  addBasket(product.id, product.price, count - 1, clientToken, setCartId);
                }}
              />
            )}
            <div className="item-offer_count">
              {product.price * count} • {count} шт
            </div>
            <FaPlus
              onClick={() => {
                onClickPlus();
                addBasket(product.id, product.price, count + 1, clientToken, setCartId);
              }}
            />
          </>
        ) : (
          <p
            onClick={() => {
              setOfferOn(true);
              addBasket(product.id, product.price, 1, clientToken, setCartId);
            }}
            className="item-offer_price"
          >
            <b>{product.price} ₸</b> &nbsp; за шт
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
}
