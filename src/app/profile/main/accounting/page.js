"use client";
import "./accounting.css";
import Footer from "@/app/components/Footer/Footer";
import ProfileNavItem from "@/app/components/ProfileNavItem/ProfileNavItem";
import ProfileGeo from "@/app/components/ProfileGeo/ProfileGeo";
import AccountingSection from "@/app/components/AccountingSection/AccountingSection";
import { useEffect, useState } from "react";
import moment from "moment";

export default function Accounting() {
  const [ordersInfo, setOrdersInfo] = useState({});
  const [clientToken, setClientToken] = useState("");
  const [branchId, setBranchId] = useState(null);
  const [addressList, setAddressList] = useState([]);

  const [firstDate, setFirstDate] = useState("");
  const [secondDate, setSecondDate] = useState("");

  const lateShowDate = moment().format("DD/MM/yyyy");
  const nowShowDate = moment().subtract(1, "days").format("DD/MM/yyyy");

  const getOrdersInfo = async () => {
    const request = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL + "/orders/financial-report",
      {
        method: "POST",
        headers: {
          "ngrok-skip-browser-warning": "any",
          Authorization: "Bearer " + clientToken,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          startDate: firstDate,
          endDate: secondDate,
          branchId: Number(branchId),
        }),
      }
    );
    const response = await request.json();
    if (!request.ok) {
      alert("Авторизуйтесь на сайте");
    }
    setOrdersInfo(response);
  };

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
    setAddressList(data);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClientToken(localStorage.getItem("token-SattyTatty"));
    }
  }, [window]);

  useEffect(() => {
    const lateDate = moment().format("yyyy/MM/DD");
    const nowDate = moment().subtract(1, "days").format("yyyy/MM/DD");

    let nowData = nowDate.split("/").join("-");
    let lateData = lateDate.split("/").join("-");
    setFirstDate(nowData);
    setSecondDate(lateData);
    getAddress();
  }, []);

  return (
    <div className="profile-main">
      <ProfileGeo />
      <h3>Бухгалтерия</h3>
      <div className="profile-select">
        <ul>
          <ProfileNavItem href={"/profile/main"} text={"Профиль"} />
          <ProfileNavItem href={"/profile/main/messages"} text={"Сообщения"} />
          <ProfileNavItem href={"/profile/main/orders"} text={"Заказы"} />
          <ProfileNavItem
            href={"/profile/main/accounting"}
            text={"Бухгалтерия"}
          />
        </ul>
      </div>
      <div className="accounting-main">
        <div>
          <div className="stats-filter">
            <div className="stats-left">
              <h3>Выберите начало периода:</h3>
              <input
                onChange={(e) => setFirstDate(e.target.value)}
                value={firstDate}
                type="date"
              />
            </div>
            <div className="stats-right">
              <h3>Выберите конец периода:</h3>
              <input
                onChange={(e) => setSecondDate(e.target.value)}
                value={secondDate}
                type="date"
              />
            </div>
          </div>
          <select
            className="accounting_branch-select"
            onChange={(e) => setBranchId(e.target.value)}
          >
            <option value={null}>Выберите адрес</option>
            {addressList.map((address) => (
              <option value={address.id}>{address.address}</option>
            ))}
          </select>
          <button onClick={getOrdersInfo} className="stats-filter_button">
            Показать
          </button>
          <p style={{ color: "#828282", margin: "10px" }}>
            {nowShowDate} - {lateShowDate}
          </p>
        </div>
        <AccountingSection />
      </div>
      <Footer />
    </div>
  );
}
