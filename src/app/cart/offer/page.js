"use client";

import Footer from "@/app/components/Footer/Footer";
import "./offer.css";
import { useEffect, useState } from "react";
import "animate.css";
import { useRouter } from "next/navigation";
import OrdersBunner from "@/app/components/OrdersBunner/OrdersBunner";

export default function Offer() {
  const router = useRouter();
  const [offerState, setOfferState] = useState(false);
  const [clientToken, setClientToken] = useState("");
  const [address, setAddress] = useState([]);

  const [offerAttention, setOfferAttention] = useState(false);

  const [currentAddress, setCurrentAddress] = useState(Number);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClientToken(localStorage.getItem("token-SattyTatty"));
    }
  }, [window]);

  const getAddress = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL + "/branches",
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
    setAddress(data);
  };

  const sendOffer = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL + "/orders",
      {
        method: "POST",
        headers: {
          "ngrok-skip-browser-warning": "any",
          Authorization: "Bearer " + clientToken,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          branchId: currentAddress,
        }),
      }
    );
    if (response.ok) {
      setOfferState(true);
      
    } else {
      setOfferState(false);
    }
  };

  function attention() {
    setTimeout(() => {
      setOfferAttention(true);
      setTimeout(() => {
        router.push("/cart/offer/result");
      }, 3000);
    }, 200);
    setTimeout(() => {
      setOfferAttention(false);
    }, 2000);
  }

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <div className="offer-page">
      <OrdersBunner/>
      <h2 style={{ marginTop: 20 }}>Оформить заказ</h2>
      <hr /> <br />
      {offerAttention ? (
        <div className="offer-attention">
          {offerState ? (
            <p className=" attention-text" id="success-offer">
              <b>Заказ оформлен</b>
            </p>
          ) : (
            <p className=" attention-text" id="bad-offer">
              <b>Произошла ошибка</b>
            </p>
          )}
        </div>
      ) : (
        <></>
      )}

      <h3 className="offer-address-title">Спобос оплаты</h3>
      <p>Kaspi.kz</p>
      <h3 className="offer-address-title">Выберите адрес</h3>
      <select
        className="offer-address"
        onChange={(e) => {
          if (e.target.value >= 0) {
            setCurrentAddress(Number(e.target.value));
          }
        }}
      >
        <option value={null}>Выберите адрес</option>
        {address.map((el) => (
          <option key={el.id} value={el.id}>
            {el.name} - {el.address}
          </option>
        ))}
      </select>
      <button
        onClick={() => {
          sendOffer();
          attention();
        }}
        className="offer-button"
      >
        <p>Перейти к оформлению</p>
      </button>
      <Footer />
    </div>
  );
}
