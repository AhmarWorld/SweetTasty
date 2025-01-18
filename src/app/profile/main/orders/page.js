"use client";
import { useEffect, useState } from "react";
import ProfileNavItem from "@/app/components/ProfileNavItem/ProfileNavItem";
import "./orders.css";
import Footer from "@/app/components/Footer/Footer";
import OrdersItem from "@/app/components/OrdersItem/OrdersItem";
import ProfileGeo from "@/app/components/ProfileGeo/ProfileGeo";
import Button from "@/app/components/Button/Button";
import ReviewModalList from "@/app/components/ReviewModalList/ReviewModalList";
import axios from "axios";
import { useRouter } from "next/navigation";

function Orders() {
  const router = useRouter();
  const [clientToken, setClientToken] = useState();
  const [user, setUser] = useState(null);
  const [orderList, setOrderList] = useState({});

  const [orderReview, setOrderReview] = useState({});
  const [reviewModalList, setReviewModalList] = useState(false);
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClientToken(localStorage.getItem("token-SattyTatty"));
    }
  }, []);

  const getReviewList = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL +
      "/productReviews/reviewedProducts/" +
      orderReview.id,
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
    } else if (response.ok) {
      setReviewList(data);
    }
  };

  const getOrderList = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL + "/orders/userOrderHistory",
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
      setOrderList(data.reverse());
    } else if (!response.ok) {
      alert("Авторизуйтесь на сайте");
    }
  };

  useEffect(() => {
    if (typeof window != "undefined") {
      const newData = JSON.parse(localStorage.getItem("user-SattyTatty"));
      setUser(newData);
    }
  }, []);

  useEffect(() => {
    if (orderReview.id) {
      getReviewList();
    }
  }, [orderReview]);

  useEffect(() => {
    getOrderList();
  }, [clientToken]);

  const repeatOrder = async (orderId) => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_SERVER_URL + "/orders/repeat",
      { orderId },
      {
        headers: {
          "ngrok-skip-browser-warning": "any",
          Authorization: "Bearer " + clientToken,
          "Content-type": "application/json",
        }
      }
    );

    const data = response.data;
    if (data.success) {
      if (data.priceRaisedProducts.length) {
        let message = `На некоторые товары поднялись цены:\n`;
        for (let product of data.priceRaisedProducts) {
          message += `${product.name} ${product.oldPrice} тг -> ${product.price} тг\n`;
        }
        alert(message);
      }
      if (data.unavailableProducts.length) {
        let message = `Некоторые товары недоступны на текущий момент:\n`;
        for (let product of data.unavailableProducts) {
          message += `${product.name}.\n`;
        }
        message += `Но мы добавили в вашу корзину то, что есть:)`;
        alert(message);
      }

      await router.push("/cart");
    } else {
      alert("Что-то пошло нетак!");
    }
  }

  return (
    <div className="profile-orders">
      <ProfileGeo />
      <h3>Заказы</h3>
      <div className="profile-select">
        <ul>
          <ProfileNavItem href={"/profile/main"} text={"Профиль"} />
          <ProfileNavItem href={"/profile/main/messages"} text={"Сообщения"} />
          <ProfileNavItem href={"/profile/main/orders"} text={"Заказы"} />
          <ProfileNavItem
            href={"/profile/main/accounting"}
            text={"Бухгалтерия"}
          />
          <ProfileNavItem
            href={"/profile/main/address"}
            text={"Мои точки"}
          />
        </ul>
      </div>
      <div className="profile-orders_main">
        <h2>Мои заказы</h2>
        <br />
        {orderList.length ? (
          <>
            {orderList.map((order) => (
              <>
                <ul key={order.id}>
                  <li>
                    <OrdersItem
                      setOrderReview={setOrderReview}
                      setReviewModalList={setReviewModalList}
                      orderNumber={`№${order.orderNumber}`}
                      address={order.branchAddress}
                      cafeName={order.branchName}
                      order={order}
                      reviewList={reviewList.orderItemIds}
                    />
                  </li>
                  <li className="orders_main-total" style={{ marginTop: 20 }}>
                    <p>Итого</p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                      <span>{order.totalPrice} ₸</span>
                      <Button
                        text={"Повторить"}
                        style={{
                          padding: "8px 10px"
                        }}
                        onClick={() => repeatOrder(order.id)}
                      />
                    </div>
                  </li>
                </ul>
                <br />
                <hr />
                <br />
              </>
            ))}
          </>
        ) : (
          <ul>
            <li
              style={{
                color: "#828282",
              }}
            >
              У вас еще нет заказов...
            </li>
          </ul>
        )}
      </div>
      <Footer />
      {reviewModalList && (
        <ReviewModalList
          userId={user.id}
          orderReview={orderReview}
          reviewList={reviewList}
          setReviewModalList={setReviewModalList}
          getOrderList={getOrderList}
        />
      )}
    </div>
  );
}

export default Orders;
