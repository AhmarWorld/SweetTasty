"use client";
import Link from "next/link";
import Footer from "../components/Footer/Footer";
import "./profil.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Profile() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [cafeName, setCafeName] = useState("");
  const [cafeAddress, setCafeAddress] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [phone, setPhone] = useState();

  const [openHour, setOpenHour] = useState();
  const [openMinute, setOpenMinute] = useState();
  const [closeHour, setCloseHour] = useState();
  const [closeMinute, setCloseMinute] = useState();

  const [ifReg, setIfReg] = useState(false);
  const regButton = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL + "/users/register",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
          accountType: "cafeOwner",
          fullname: fullname,
          phone: phone,
          cafeName: cafeName,
          cafeAddress: cafeAddress,
          openTime: openTime,
          closeTime: closeTime,
        }),
      }
    );
    const data = await response.json();
    if (data.status === 201) {
      router.push("/profile/auth");
    }
  };

  useEffect(() => {
    const data = `${openHour}:${openMinute}`;

    setOpenTime(data);
  }, [openHour, openMinute]);

  useEffect(() => {
    const data = `${closeHour}:${closeMinute}`;
    setCloseTime(data);
  }, [closeHour, closeMinute]);

  const onChange = (value, setFunc) => {
    setFunc(value);
  };

  const onChangeUsername = (value, setFunc) => {
    if (!value.includes(" ")) {
      if (/^[a-zA-Z0-9]+$/.test(value)) {
        setFunc(value);
      } else if (value === "" && setFunc.length > 0) {
        setFunc(value);
      }
    }
  };

  const onChangePassword = (value, setFunc) => {
    if (!value.includes(" ")) {
      if (/^[a-zA-Z0-9]+$/.test(value)) {
        setFunc(value);
      } else if (value === "" && setFunc.length > 0) {
        setFunc(value);
      }
    }
  };

  return (
    <div className="profile">
      <div className="profile-title">
        <h1>Добро пожаловать в SweetTasty.kz</h1>
        <p>
          Войдите чтобы копить бонусы, сохранить адрес доставки и историю
          заказов
        </p>
      </div>
      {ifReg ? (
        <>
          <form className="resitration-form">
            <label>
              Имя Пользователя <br />
              <input
                onChange={(e) => {
                  onChangeUsername(e.target.value, setUsername);
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
                  onChangePassword(e.target.value, setPassword);
                }}
                value={password}
                id="password"
                placeholder="Пароль"
                type="password"
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
              />
            </label>
            <label>
              Название кофейни <br />
              <input
                value={cafeName}
                onChange={(e) => {
                  onChange(e.target.value, setCafeName);
                }}
                id="name-coffee"
                placeholder="SattyTatty"
              />
            </label>
            <label>
              Адрес кофейни <br />
              <input
                value={cafeAddress}
                onChange={(e) => {
                  onChange(e.target.value, setCafeAddress);
                }}
                id="adres"
                placeholder="Мангилик Ел, 1"
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
              />
            </label>
            <div className="work-time">
              <label className="open-time">
                Время открытия:
                <div>
                  <input
                    value={openHour}
                    onChange={(e) => {
                      onChange(e.target.value, setOpenHour);
                    }}
                    id="hour"
                    type="number"
                    placeholder="12"
                  />
                  <span>:</span>
                  <input
                    value={openMinute}
                    onChange={(e) => {
                      onChange(e.target.value, setOpenMinute);
                    }}
                    id="minute"
                    type="number"
                    placeholder="00"
                  />
                </div>
              </label>
              <label className="close-time">
                Время желаемой доставки:
                <div>
                  <input
                    value={closeHour}
                    onChange={(e) => {
                      onChange(e.target.value, setCloseHour);
                    }}
                    id="hour"
                    type="number"
                    placeholder="23"
                  />
                  <span>:</span>
                  <input
                    value={closeMinute}
                    onChange={(e) => {
                      onChange(e.target.value, setCloseMinute);
                    }}
                    id="minute"
                    type="number"
                    placeholder="00"
                  />
                </div>
              </label>
            </div>
          </form>
          <div className="after_profile-buttons">
            <button onClick={regButton}>Регистрация</button>
            <Link href="/profile/auth">
              Уже есть аккаунт? <u>Войти</u>
            </Link>
          </div>
        </>
      ) : (
        <div className="pervios_profile-buttons">
          <Link href="/profile/auth">
            <button>Войти</button>
          </Link>
          <p onClick={() => setIfReg(true)}>
            Нет аккаунта? <u>Регистрация</u>
          </p>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Profile;
