"use client";

import { useEffect, useState } from "react";
import "./CartItem.css";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { addBasket } from "@/app/lib/basket";
import { useRoot } from "@/app/lib/store";

function CartItem({ item, cartList, setCartList, totalSum, setTotalSum }) {
  const price = item.price;
  const [newPrice, setNewPrice] = useState(price);
  const [count, setCount] = useState(1);

  const [clientToken, setClientToken] = useState("");

  const { addToCart, setCart } = useRoot();

  const onClickMin = () => {
    let newCount = 1;
    if (count > 1) {
      newCount = Number(count) - 1;
      setCount(newCount);
      setNewPrice(Number(newCount) * Number(price));
      let newTotalSum = totalSum - Number(price)
      setTotalSum(newTotalSum)
      addBasket(item.id, item.price, newCount, clientToken);
    } else {
      setCount(1);
    }
  };

  const onClickPlus = () => {
    let newCount = 1;
    if (count >= 1) {
      newCount = Number(count) + 1;
      setCount(newCount);
      setNewPrice(Number(newCount) * Number(price));
      let newTotalSum = totalSum + Number(price)
      setTotalSum(newTotalSum)
      addBasket(item.id, item.price, newCount, clientToken);
    }
    addToCart({...item, count: newCount});
  };

  const deleteItem = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL + "/cartItems/" + item.cartItemId,
      {
        method: "DELETE",
        headers: {
          "ngrok-skip-browser-warning": "any",
          Authorization: "Bearer " + clientToken,
          "Content-type": "application/json",
        },
      }
    );
    if (response.ok) {
      let newCartList = cartList.filter((el) => el.cartItemId != item.cartItemId);
      let newTotalSum = totalSum - (newPrice)
      setTotalSum(newTotalSum)
      setCartList(newCartList);
      setCart(newCartList)
    }
  };

  useEffect(() => {
    setCount(item.quantity);
    setNewPrice(Number(item.quantity) * Number(price));
    setClientToken(localStorage.getItem("token-SattyTatty"));
  }, []);

  return (
    <div className="cart-item">
      <img
        src={process.env.NEXT_PUBLIC_SERVER_URL + item.image}
        alt=":/"
      />
      <div className="cart-item_main">
        <div class="cart-item__label">
          <p>{item.name}</p>
          {/* <div class="cart-item_label-discount">−29%</div> */}
        </div>
        <div class="cart-item__remove">
          <button onClick={deleteItem} type="button" class="cart-item__clear">
            <svg
              data-v-1ec77d30=""
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_5215_554)">
                <path
                  data-v-1ec77d30=""
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M18.3215 7.17787L19.0993 6.40006L17.5436 4.84442L16.7658 5.62224L11.9994 10.3886L7.23361 5.6228L6.4558 4.84499L4.90016 6.40062L5.67798 7.17844L10.4438 11.9443L5.67761 16.7104L4.8998 17.4883L6.45543 19.0439L7.23325 18.2661L11.9994 13.4999L16.7614 18.2618L17.5392 19.0397L19.0948 17.484L18.317 16.7062L13.5551 11.9443L18.3215 7.17787Z"
                  fill="#E6E6E6"
                ></path>
              </g>{" "}
              <defs data-v-1ec77d30="">
                <clipPath id="clip0_5215_554">
                  <rect
                    data-v-1ec77d30=""
                    width="24"
                    height="24"
                    fill="white"
                  ></rect>
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
        <div className="cart-item_count">
          <div onClick={onClickMin} className="item_count-min">
            {count - 1 ? (
              <FaMinus size={16} />
            ) : (
              <MdDeleteForever onClick={deleteItem} size={16} />
            )}
          </div>
          <span>{count}</span>
          <div onClick={onClickPlus} className="item_count-plus">
            <FaPlus size={16} />
          </div>
        </div>
        <b data-v-1ec77d30="" class="cart-item__price">
          <span
            data-v-1ec77d30=""
            class="previous price--wrapper price--currency_KZT"
          >
            {item.oldPrice ? (
              <>
                {item.oldPrice}
                <span class="price--sign price--suffix">₸</span>
              </>
            ) : (
              <></>
            )}
          </span>
          <span data-v-1ec77d30="" class="price--wrapper price--currency_KZT">
            {newPrice}
            <span class="price--sign price--suffix">₸</span>
          </span>
        </b>
      </div>
    </div>
  );
}

export default CartItem;
