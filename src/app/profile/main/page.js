"use client";

import ProfileNavItem from "@/app/components/ProfileNavItem/ProfileNavItem";
import "./main.css";
import { useState, useEffect } from "react";
import Footer from "@/app/components/Footer/Footer";
import ProfileGeo from "@/app/components/ProfileGeo/ProfileGeo";
import { useRouter } from "next/navigation";
import Select from 'react-select'
import axios from "axios";

function Main() {
  const WORK_DAYS = {
    "Monday" : "Понедельник",
    "Tuesday" : "Вторник",
    "Wednesday" : "Среда",
    "Thursday" : "Четверг",
    "Friday" : "Пятница",
    "Saturday" : "Суббота",
    "Sunday" : "Воскресенье",
  }

  const [user, setUser] = useState(null);
  const router = useRouter();

  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState("*********");
  const [fullname, setFullname] = useState(user?.fullname || "");
  const [phone, setPhone] = useState(user?.phone);
  const [selectedWorkDays, setSelectedWorkDays] = useState([]);
  const [providerInfo, setProviderInfo] = useState();

  const [isProvider, setIsProvider] = useState(false);

  const workDaysOptions = [
      { value: 'Monday', label: 'Понедельник' },
      { value: 'Tuesday', label: 'Вторник' },
      { value: 'Wednesday', label: 'Среда' },
      { value: 'Thursday', label: 'Четверг' },
      { value: 'Friday', label: 'Пятница' },
      { value: 'Saturday', label: 'Суббота' },
      { value: 'Sunday', label: 'Воскресенье' },
  ]

  const onChange = (value, setFunc) => {
    setFunc(value);
  };

  const onClickLogout = () => {
    localStorage.clear();
    router.push("/profile/auth");
  };

  const onClickSave = async () => {
      const response = await axios.put(
          process.env.NEXT_PUBLIC_SERVER_URL + '/users/' + user.id,
          { fullname, workDays: selectedWorkDays.join(',') },
          {
              headers: {
                  "ngrok-skip-browser-warning": "any",
                  "Content-type": "application/json",
              }
          }
      );

      if (response.data.success) {
          alert("Данные обновлены успешно!");
          localStorage.setItem("user-SattyTatty", JSON.stringify({ ...user, fullname: response.data.user.fullname }));
      } else {
          alert("Ошибка обновления данных!");
      }
  }

  useEffect(() => {
    (async function(){
      if (typeof window != "undefined") {
        const newData = JSON.parse(localStorage.getItem("user-SattyTatty"));
        if (newData) {
          if (newData?.accountType === "provider") {
            const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL + '/users/getProviderInfoByUserId/' + newData.id);
            if (response.data.success) {
              const a = response.data.info.workDays ? response.data.info.workDays.split(',') : null;
              setSelectedWorkDays(response.data.info.workDays ? response.data.info.workDays.split(',') : null)
              setProviderInfo(response.data.info);
            }

            setIsProvider(true);
          } else {
            setIsProvider(false);
          }
        } else {
          router.push("/profile/auth/redirect");
        }
        setUser(newData);
        setUsername(newData?.username);
        setFullname(newData?.fullname);
        setPhone(newData?.phone);
      }
    })();
  }, []);

  return (
    user && (
        <div className="profile-main">
          <ProfileGeo/>
          <h3>Профиль</h3>
          <div className="profile-select">
            <ul>
              <ProfileNavItem href={"/profile/main"} text={"Профиль"}/>
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
                  <ProfileNavItem href={"/profile/main/orders"} text={"Заказы"}/>
              )}
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
          <img src="https://avatar.iran.liara.run/public/35" alt=":/"/>
          <form className="resitration-form">
            <label>
              Имя Пользователя <br/>
              <input
                  onChange={(e) => {
                    onChange(e.target.value, setUsername);
                  }}
                  value={username}
                  id="username"
                  placeholder="Имя пользователя"
                  disabled={true}
              />
            </label>
            {/*<p className="profile-change_info">*/}
            {/*  Для изменении данных ниже обратитесь в службу поддержди*/}
            {/*</p>*/}
            <label>
              Пароль <br/>
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
              Полное имя <br/>
              <input
                  onChange={(e) => {
                    onChange(e.target.value, setFullname);
                  }}
                  style={{
                    background: "#fff",
                  }}
                  value={fullname}
                  id="fio"
                  placeholder="ФИО"
                  disabled={false}
              />
            </label>
            <label>
              Номер телефона <br/>
              <input
                  value={phone}
                  onChange={(e) => {
                    onChange(e.target.value, setPhone);
                  }}
                  id="number"
                  type="text"
                  placeholder="8777*******"
                  disabled={true}
              />
            </label>

              {
                  isProvider ? (
                      <label>
                          Дни отображения вашей продукции <br/> <br/>
                          <Select
                              options={workDaysOptions}
                              isMulti={true}
                              onChange={arr => setSelectedWorkDays(arr.map(i => i.value))}
                              defaultValue={providerInfo.workDays ? providerInfo.workDays.split(',').map(item => ({ value: item, label: WORK_DAYS[item] })) : null}
                          />
                      </label>
                  ) : null
              }
          </form>
            <button onClick={onClickSave} className="profile-main_button" style={{ backgroundColor: "green" }}>
            <b>Сохранить</b>
          </button>
          <button onClick={onClickLogout} className="profile-main_button">
            <b>Выйти из аккаунта</b>
          </button>
          <Footer/>
        </div>
    )
  );
}

export default Main;
