"use client";

import Footer from "@/app/components/Footer/Footer";
import "./CatalogItem.css";
import { useEffect, useState } from "react";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { addBasket } from "@/app/lib/basket";
import OrdersBunner from "@/app/components/OrdersBunner/OrdersBunner";
import HotOffers from "@/app/components/HotOffers/HotOffers";
import Search from "@/app/components/Search/Search";

export default function CatalogItem({ params }) {
  const [product, setProduct] = useState({});
  const [offerOn, setOfferOn] = useState(false);

  const [newPrice, setNewPrice] = useState(product.price);
  const [count, setCount] = useState(1);

  const clientToken = localStorage.getItem("token-SattyTatty");

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
      process.env.NEXT_PUBLIC_SERVER_URL + "/cartItem/" + params.id,
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
  }, []);

  return (
    <div className="catalog-item">
      <OrdersBunner />
      <HotOffers/>
      <Search placeholder={'Искать в SweetTasty'} />
      <div className="catalog-item_main">
        <img
          src={
            "https://arbuz.kz/image/s3/arbuz-kz-products/file_name__daafaf07-b6ad-4462-bc58-a8f7655f4cf9-19367-001_jpg.jpg?w=720&h=720&_c=1719999319"
          }
        />
        {/* <img src={process.env.NEXT_PUBLIC_SERVER_URL + product.image} /> */}
        <h1> {product.name}</h1>
        <div className="item_main-discription">
          <h3>Описание</h3>
          <p>Срок годности: {product.expirationDate}</p>
          <p>Температура хранения: {product.temperature}</p>
          <h3>Состав</h3>
          <p>{product.compound}</p>
          <h3>Поставщик</h3>
          <p>Realibi</p>
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
                  addBasket(product.id, product.price, count - 1, clientToken);
                }}
              />
            )}
            <div className="item-offer_count">
              {product.price * count} • {count} шт
            </div>
            <FaPlus
              onClick={() => {
                onClickPlus();
                addBasket(product.id, product.price, count + 1, clientToken);
              }}
            />
          </>
        ) : (
          <p
            onClick={() => {
              setOfferOn(true);
              addBasket(product.id, product.price, 1, clientToken);
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
