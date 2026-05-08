"use client";
import { useEffect, useState } from "react";
import ProfileNavItem from "@/app/components/ProfileNavItem/ProfileNavItem";
import "./ProviderOrders.css";
import Footer from "@/app/components/Footer/Footer";
import ProfileGeo from "@/app/components/ProfileGeo/ProfileGeo";
import ProviderOrder from "@/app/components/ProviderOrder/ProviderOrder";

function ProviderOrders() {
  const [clientToken, setClientToken] = useState();
  const [orderList, setOrderList] = useState([]);
  const [isProvider, setIsProvider] = useState(false);

  useEffect(() => {
    (async function () {
      if (typeof window != "undefined") {
        const newData = JSON.parse(localStorage.getItem("user-SattyTatty"));
        if (newData) {
          setIsProvider(newData?.accountType === "provider");
        } else {
          router.push("/profile/auth/redirect");
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClientToken(localStorage.getItem("token-SattyTatty"));
    }
  }, []);

  const getOrderList = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL + "/providers/orders",
      {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "any",
          Authorization: "Bearer " + clientToken,
          "Content-type": "application/json",
        },
      },
    );
    const data = await response.json();
    if (!response.ok) {
      alert("Авторизуйтесь на сайте");
    } else if (response.ok) {
      setOrderList(data);
    }
  };

  useEffect(() => {
    if (clientToken) {
      getOrderList();
    }
  }, [clientToken]);
  return (
    <div className="profile-orders">
      <ProfileGeo />
      <h3>Заказы</h3>
      <div className="profile-select">
        <ul>
          <ProfileNavItem href={"/profile/main"} text={"Профиль"} />
          <ProfileNavItem
            href={"/profile/main/provider/orders"}
            text={"Заказы"}
          />
          {isProvider && (
            <ProfileNavItem
              href={"/profile/main/provider/orderItems"}
              text={"Заявка"}
            />
          )}
          {!isProvider && (
            <ProfileNavItem
              href={"/profile/main/accounting"}
              text={"Бухгалтерия"}
            />
          )}
        </ul>
      </div>
      <div className="profile-orders_main">
        <h2>Мои заказы (последние 100)</h2>
        {orderList.length ? (
          <>
            {orderList.map((order) => (
              <>
                <ul key={order.id}>
                  <li>
                    <ProviderOrder
                      orderCreatedAt={order.createdAt}
                      order={order.items}
                      orderNumber={"№ " + order.orderNumber}
                      isCompleted={order.isCompleted}
                      isPaid={order.isPaid}
                    />
                  </li>
                  <li className="orders_main-total">
                    <p>Итого</p>
                    <div>
                      <span>
                        {order.items.reduce(
                          (acc, item) => acc + item.price * item.quantity,
                          0,
                        )}{" "}
                        ₸
                      </span>
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

export default ProviderOrders;
