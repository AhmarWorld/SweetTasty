"use client";

import Footer from "@/app/components/Footer/Footer";
import "./address.css";
import AddressListItem from "@/app/components/AddressListItem/AddressListItem";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Address() {
  const [clientToken, setClientToken] = useState("");
  const [user, setUser] = useState({});
  const [addressList,setAddressList] = useState([])

  const router = useRouter();
  
  const [openHour, setOpenHour] = useState();
  const [openMinute, setOpenMinute] = useState();
  const [closeHour, setCloseHour] = useState();
  const [closeMinute, setCloseMinute] = useState();
  
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactPhone, setContactPhone] = useState(null);
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");

  const createAddress = async () => {
    await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/branches", {
      method: "POST",
      headers: {
        "ngrok-skip-browser-warning": "any",
        Authorization: "Bearer " + clientToken,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        address: address,
        contactPerson: contactPerson,
        contactPhone: contactPhone,
        userId: user.id,
        openTime: openTime,
        closeTime: closeTime,
      }),
    });
    window.location.reload();
  };

  const getAddress = async ()=>{
    const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/branches/all',{
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "any",
        Authorization: "Bearer " + clientToken,
        'Content-type': 'application/json'
      }
    })
    const data = await response.json()
    setAddressList(data)
  }

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

  useEffect(() => {
    const token = localStorage.getItem("token-SattyTatty");
    const userLocal = JSON.parse(localStorage.getItem("user-SattyTatty"));
    setClientToken(token);
    setUser(userLocal);

    if (clientToken) getAddress()
  }, [clientToken]);

  return (
    <div className="address">
      <h1>Добавить адрес</h1>
      <form className="address-form">
        <label>
          Наименование пункта <br />
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="username"
            placeholder="Пункт"
          />
        </label>
        <label>
          Адрес пункта <br />
          <input
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            id="address"
            placeholder="Адрес"
          />
        </label>
        <label>
          Ответсвенное лицо <br />
          <input
            value={contactPerson}
            onChange={(e) => {
              setContactPerson(e.target.value);
            }}
            id="name"
            placeholder="Имя лица"
          />
        </label>
        <label>
          Номер телефона ответственного лица <br />
          <input
            value={contactPhone}
            onChange={(e) => {
              setContactPhone(e.target.value);
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

        <div className="submit-button" onClick={createAddress}>Добавить</div>
      </form>
      <div className="address-list">
        <p>Ваши адреса</p>
        {addressList && addressList.map((address)=>(
          <AddressListItem key={address.id} address={address}/>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Address;
