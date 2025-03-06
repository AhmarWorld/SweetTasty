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
  const [deliveryTime, setDeliveryTime] = useState("");
  const [phone, setPhone] = useState("");

  const [openHour, setOpenHour] = useState("");
  const [openMinute, setOpenMinute] = useState("");
  const [deliveryHour, setDeliveryHour] = useState("");
  const [deliveryMinute, setDeliveryMinute] = useState("");

  const [ifReg, setIfReg] = useState(false);
  const [role, setRole] = useState('cafe');

  const regButton = async () => {
    const baseData = {
      username: username,
      password: password,
      accountType: role === 'cafe' ? "cafeOwner" : "provider",
      fullname: fullname,
      phone: phone,
    };

    const cafeData = role === 'cafe' ? {
      cafeName: cafeName,
      cafeAddress: cafeAddress,
      openTime: openTime,
      closeTime: deliveryTime,
    } : {};

    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL + "/users/register",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          ...baseData,
          ...cafeData
        }),
      }
    );
    const data = await response.json();
    if (data.status === 201) {
      router.push("/profile/redirect");
    }
  };

  useEffect(() => {
    const data = `${openHour}:${openMinute}`;

    setOpenTime(data);
  }, [openHour, openMinute]);

  useEffect(() => {
    const data = `${deliveryHour}:${deliveryMinute}`;
    setDeliveryTime(data);
  }, [deliveryHour, deliveryMinute]);

  const onChange = (value, setFunc) => {
    setFunc(value);
  };

  const onChangeUsername = (value, setFunc) => {
    if (!value.includes(" ")) {
      if (/^[а-яА-Яa-zA-Z0-9]+$/.test(value)) {
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

  const onChangeFullname = (value, setFunc) => {
    if (/^[а-яА-Яa-zA-Z\s]*$/.test(value)) {
      const trimmedValue = value.replace(/\s+/g, " ").trim();
      const words = trimmedValue.split(" ");
      if (words.length <= 3) {
        setFunc(value);
      }
    }
  };

  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/\D/g, "");

    const truncated = numbers.slice(0, 11);

    if (truncated.length === 0) return "";
    if (truncated.length <= 1) return `+${truncated}`;
    if (truncated.length <= 4)
      return `+${truncated.slice(0, 1)} (${truncated.slice(1)}`;
    if (truncated.length <= 7)
      return `+${truncated.slice(0, 1)} (${truncated.slice(
        1,
        4
      )}) ${truncated.slice(4)}`;
    if (truncated.length <= 9)
      return `+${truncated.slice(0, 1)} (${truncated.slice(
        1,
        4
      )}) ${truncated.slice(4, 7)}-${truncated.slice(7)}`;
    return `+${truncated.slice(0, 1)} (${truncated.slice(
      1,
      4
    )}) ${truncated.slice(4, 7)}-${truncated.slice(7, 9)}-${truncated.slice(
      9
    )}`;
  };

  const onChangePhone = (value, setFunc) => {
    setFunc(formatPhoneNumber(value));
  };

  const validateHour = (value) => {
    if (value >= 0 && value <= 23) {
      return value;
    }
  };

  const validateMinute = (value) => {
    if (value >= 0 && value <= 59) {
      return value;
    } else if (value > 59) {
      return 59;
    }
  };

  return (
    <div className="profile">
      <div className="profile-title">
        <h1>Добро пожаловать в Marketly</h1>
        <p>
          Войдите чтобы копить бонусы, сохранить адрес доставки и историю
          заказов
        </p>
        <div className="profile-select_role">
          <div className="switch">
            <input 
              type="checkbox" 
              id="role-switch"
              checked={role === 'supplier'}
              onChange={(e) => setRole(e.target.checked ? 'supplier' : 'cafe')}
            />
            <label htmlFor="role-switch">
              <span className="switch-text cafe">Кофейня</span>
              <span className="switch-text supplier">Поставщик</span>
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>
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
                  onChangeFullname(e.target.value, setFullname);
                }}
                value={fullname}
                id="fio"
                placeholder="Имя Фамилия Отчество"
              />
            </label>
            {role === 'cafe' && (
              <>
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
                <div className="time-inputs">
                  <div className="work-time">
                    <h3>Время работы</h3>
                    <div className="time-row">
                      <label className="time-label">
                        Открытие:
                        <div className="time-input-group">
                          <input
                            value={openHour}
                            onChange={(e) =>
                              setOpenHour(validateHour(e.target.value))
                            }
                            placeholder="00"
                            maxLength={2}
                            type="text"
                          />
                          <span>:</span>
                          <input
                            value={openMinute}
                            onChange={(e) =>
                              setOpenMinute(validateMinute(e.target.value))
                            }
                            placeholder="00"
                            maxLength={2}
                            type="text"
                          />
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="delivery-time">
                    <h3>Желаемое время доставки</h3>
                    <div className="time-row">
                      <label className="time-label">
                        Время:
                        <div className="time-input-group">
                          <input
                            value={deliveryHour}
                            onChange={(e) =>
                              setDeliveryHour(validateHour(e.target.value))
                            }
                            placeholder="00"
                            maxLength={2}
                            type="text"
                          />
                          <span>:</span>
                          <input
                            value={deliveryMinute}
                            onChange={(e) =>
                              setDeliveryMinute(validateMinute(e.target.value))
                            }
                            placeholder="00"
                            maxLength={2}
                            type="text"
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </>
            )}
            <label>
              Номер телефона <br />
              <input
                value={phone}
                onChange={(e) => {
                  onChangePhone(e.target.value, setPhone);
                }}
                id="number"
                type="text"
                placeholder="+7 (777) 777-77-77"
              />
            </label>
          </form>
          <div className="after_profile-buttons">
            <button onClick={regButton}>Регистрация</button>
            <Link href="/profile/auth">
              Уже есть аккаунт? <u>Войти</u>
            </Link>
          </div>
      <Footer />
    </div>
  );
}

export default Profile;
