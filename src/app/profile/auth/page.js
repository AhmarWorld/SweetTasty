"use client";

import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import "./authentication.css";
import "animate.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Auth() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [offerState, setOfferState] = useState(false);
  const [offerAttention, setOfferAttention] = useState(false);

  function attention() {
    setTimeout(() => {
      setOfferAttention(true);
      
    }, 500);
    setTimeout(() => {
      setOfferAttention(false);
    }, 2000);
  }

  const authButton = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL + "/users/auth",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }
    );
    const data = await response.json()
    if (data.success) {
      localStorage.setItem("user-SattyTatty", JSON.stringify(data.user));
      localStorage.setItem("token-SattyTatty", data.token);
      console.log(response)

      router.push("/profile/main");
      setOfferState(true);
    }else {
      setOfferState(false);
    }
  };

  const onChange = (value, setFunc) => {
    setFunc(value);
  };

  return (
    <div className="authentication">
      <div className="authentication-title">
        <h1>Авторизация</h1>
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

        <p>
          Войдите чтобы копить бонусы, сохранить адрес доставки и историю
          заказов
        </p>
      </div>
      <form className="authentication-form">
        <label>
          Имя Пользователя <br />
          <input
            onChange={(e) => {
              onChange(e.target.value, setUsername);
            }}
            value={username}
            id="username"
            placeholder="Имя пользователя"
          />
        </label>
        <label>
          Пароль <br />
          <input
            onChange={(e) => {
              onChange(e.target.value, setPassword);
            }}
            value={password}
            id="password"
            placeholder="Пароль"
            type="password"
          />
        </label>
      </form>
      <div className="authentication-buttons">
        <button 
        onClick={() => {
          authButton();
          attention();
        }}
        >Войти</button>
        <Link className="authentication-registration" href="/profile">
          <u>Зарегистрироваться</u>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Auth;
