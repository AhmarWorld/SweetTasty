"use client";
import { useEffect, useState } from "react";
import ProfileNavItem from "@/app/components/ProfileNavItem/ProfileNavItem";
import "./orders.css";
import Footer from "@/app/components/Footer/Footer";
import OrdersItem from "@/app/components/OrdersItem/OrdersItem";
import ProfileGeo from "@/app/components/ProfileGeo/ProfileGeo";
import Button from "@/app/components/Button/Button";
import ReviewModalList from "@/app/components/ReviewModalList/ReviewModalList";

function Orders() {
  const clientToken = localStorage.getItem("token-SattyTatty");
  const [user, setUser] = useState(null);
  const [orderList, setOrderList] = useState([]);

  const [orderReview, setOrderReview] = useState({});
  const [reviewModalList, setReviewModalList] = useState(false);
  const [reviewList, setReviewList] = useState([]);

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
      setOrderList(data);
    } else if (!response.ok) {
      console.log("Авторизуйтесь на сайте");
    }
  };

  useEffect(() => {
    if (typeof window != "undefined") {
      const newData = JSON.parse(localStorage.getItem("user-SattyTatty"));
      setUser(newData);
    }
  }, [window]);

  useEffect(() => {
    if (orderReview.id) {
      getReviewList();
    }
  }, [orderReview]);

  useEffect(() => {
    getOrderList();
  }, []);
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
        </ul>
      </div>
      <div className="profile-orders_main">
        <h2>Мои заказы</h2>
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
                  <li className="orders_main-total">
                    <p>Итого</p>
                    <div>
                      <span>{order.totalPrice} ₸</span>
                      <Button text={"Повторить"} />
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
        />
      )}
    </div>
  );
}

export default Orders;
