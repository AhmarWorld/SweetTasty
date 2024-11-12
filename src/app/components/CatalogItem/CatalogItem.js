"use client";

import { useEffect, useState } from "react";
import "./CatalogItem.css";
import { AiOutlinePlus } from "react-icons/ai";
import { FaMinus, FaPlus, FaStar } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { addBasket } from "../../lib/basket";
import { useRouter } from "next/navigation";
import Link from "next/link";

function CatalogItem({
  id,
  img,
  text,
  price,
  units = "кг",
  sell,
  currency = " ₸",
  rating,
  reviewsCount
}) {
  const router = useRouter();

  const [clientToken, setClientToken] = useState('');
  const [count, setCount] = useState(0);
  const [counterOn, setCounterOn] = useState(true);
  const [cartId, setCartId] = useState(null);

  const [isAuth, setIsAuth] = useState(true);

  useEffect(() => {
    if (!isAuth) {
      router.push("/profile/authentication");
    }
  }, [isAuth]);

  const cartEdit = async (quantity) => {
    addBasket(id, price, quantity, clientToken, setCartId);
  }

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
      cartEdit(newCount)
    }
  };

  const onClickPlus = () => {
    let newCount = 0;

    if (count >= 0) {
      newCount = Number(count) + 1;
      setCount(newCount);
      cartEdit(newCount)
    }

    addBasket(id, price, quantity, clientToken, setCartId);
  };

  useEffect(() => {
    if (count >= 1) {
      setCounterOn(true);
    } else if (count < 1) {
      setCounterOn(false);
    }
  }, [count]);

  useEffect(() => {
    setClientToken(localStorage.getItem('token-SattyTatty'));
  }, [window]);

  return (
    <div className="item-card">
      <Link href={`/catalog/${id}`}>
        <div className="item-card_img">
          <img
            src="https://arbuz.kz/image/s3/arbuz-kz-products/302438-farsh_kazbeef_zeren_iz_govyadiny_70_30_ohl_1_kg_.png?w=720&h=720&_c=1727244986"
            alt=""
          />
        </div>
        <div className="item-card_rating">
            <div className="rating-stars">
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} className={index < Math.round(rating) ? "star-filled" : "star-empty"} />
              ))}
            </div>
            <span className="reviews-count">({reviewsCount})</span>
          </div>
        <div className="item-card_title">
          <b>{text}</b>
          <p className="currency">Поставщик Realibi</p>
        </div>
        <div className="price">
          <span>{price} ₸</span>
          {sell ? <span className="price-sell">{sell} ₸</span> : <></>}
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
