"use client";
import { useEffect, useState } from "react";
import ProfileNavItem from "@/app/components/ProfileNavItem/ProfileNavItem";
import "./orders.css";
import Footer from "@/app/components/Footer/Footer";
import OrdersItem from "@/app/components/OrdersItem/OrdersItem";
import ProfileGeo from "@/app/components/ProfileGeo/ProfileGeo";
import Button from "@/app/components/Button/Button";

function Orders() {
  const clientToken = localStorage.getItem("token-SattyTatty");
  const [orderList, setOrderList] = useState([]);

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
    if (!response.ok) {
      alert("Авторизуйтесь на сайте");
    } else if (response.ok) {
      setOrderList(data);
    }
  };

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
          <ProfileNavItem href={"/profile/main/accounting"} text={"Бухгалтерия"} />
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
                      orderNumber={`№${order.orderNumber}`}
                      address={order.branchAddress}
                      cafeName={order.branchName}
                      order={order}
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
    </div>
  );
}

export default Orders;
