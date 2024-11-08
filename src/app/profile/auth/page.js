"use client";

import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import "./authentication.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
function Auth() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
    const data = await response.json();
    if (data.success) {
      localStorage.setItem("user-SattyTatty", JSON.stringify(data.user));
      localStorage.setItem("token-SattyTatty", data.token);

      router.push("/profile/main");
    }
  };

  const onChange = (value, setFunc) => {
    setFunc(value);
  };

  return (
    <div className="authentication">
      <div className="authentication-title">
        <h1>Авторизация</h1>
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
        <button onClick={authButton}>Войти</button>
        <Link className="authentication-registration" href="/profile">
          <u>Зарегистрироваться</u>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Auth;
