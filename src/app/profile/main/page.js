"use client";

import ProfileNavItem from "@/app/components/ProfileNavItem/ProfileNavItem";
import "./main.css";
import { useState, useEffect } from "react";
import Footer from "@/app/components/Footer/Footer";
import ProfileGeo from "@/app/components/ProfileGeo/ProfileGeo";
import { useRouter } from "next/navigation";

function Main() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState("*********");
  const [fullname, setFullname] = useState(user?.fullname || "");
  const [phone, setPhone] = useState(user?.phone);

  const [isProvider, setIsProvider] = useState(false);

  const onChange = (value, setFunc) => {
    setFunc(value);
  };

  const onClickLogout = () => {
    localStorage.clear();
    router.push("/profile/auth");
  };

  useEffect(() => {
    if (typeof window != "undefined") {
      const newData = JSON.parse(localStorage.getItem("user-SattyTatty"));
      if (newData) {
        if (newData?.accountType === "provider") {
          setIsProvider(true);
        } else {
          setIsProvider(false);
        }
      } else {
        router.push("/profile/auth");
      }
      setUser(newData);
      setUsername(newData?.username);
      setFullname(newData?.fullname);
      setPhone(newData?.phone);
    }
  }, [window]);

  return (
    user && (
      <div className="profile-main">
        <ProfileGeo />
        <h3>Профиль</h3>
        <div className="profile-select">
          <ul>
            <ProfileNavItem href={"/profile/main"} text={"Профиль"} />
            <ProfileNavItem
              href={"/profile/main/messages"}
              text={"Сообщения"}
            />
            {isProvider ? (
              <ProfileNavItem
                href={"/profile/main/provider/orders"}
                text={"Заказы"}
              />
            ) : (
              <ProfileNavItem href={"/profile/main/orders"} text={"Заказы"} />
            )}
            <ProfileNavItem
              href={"/profile/main/accounting"}
              text={"Бухгалтерия"}
            />
          </ul>
        </div>
        <img src="https://avatar.iran.liara.run/public/35" alt=":/" />
        <form className="resitration-form">
          <label>
            Имя Пользователя <br />
            <input
              style={{
                background: "#fff",
              }}
              onChange={(e) => {
                onChange(e.target.value, setUsername);
              }}
              value={username}
              id="username"
              placeholder="Имя пользователя"
            />
          </label>
          <p className="profile-change_info">
            Для изменении данных нижу обратитесь в службу поддержди
          </p>
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
              disabled={true}
            />
          </label>
          <label>
            Полное имя <br />
            <input
              onChange={(e) => {
                onChange(e.target.value, setFullname);
              }}
              value={fullname}
              id="fio"
              placeholder="ФИО"
              disabled={true}
            />
          </label>
          <label>
            Номер телефона <br />
            <input
              value={phone}
              onChange={(e) => {
                onChange(e.target.value, setPhone);
              }}
              id="number"
              type="number"
              placeholder="8777*******"
              disabled={true}
            />
          </label>
        </form>
        <button onClick={onClickLogout} className="profile-main_button">
          <b>Выйти из аккаунта</b>
        </button>
        <Footer />
      </div>
    )
  );
}

export default Main;
