"use client";
import "./stats.css";
import ProfileNavItem from "@/app/components/ProfileNavItem/ProfileNavItem";
import Footer from "@/app/components/Footer/Footer";
import { useEffect, useState } from "react";
import moment from "moment";
import ProfileGeo from "@/app/components/ProfileGeo/ProfileGeo";
import { useRouter } from "next/navigation";

function Stats() {
  const [firstDate, setFirstDate] = useState("");
  const [secondDate, setSecondDate] = useState("");

  const [statsList, setStatsList] = useState({});
  const [ifStats, setIfStats] = useState(false)

  const lateShowDate = moment().format("DD/MM/yyyy");
  const nowShowDate = moment().subtract(1, "days").format("DD/MM/yyyy");

  const clientToken = localStorage.getItem("token-SattyTatty");
  const router = useRouter();

  const getStatsList = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL + "/orders/statistics",
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
        }),
      }
    );
    const data = await response.json();
    if (!data.success && data.message == "User not authorized") {
      alert("Авторизуйтесь на сайте");
      router.push("/profile/authentication");
    } else if (response.ok) {
      setStatsList(data);
      if(data.products.length > 0){
        setIfStats(true)
      }else{
        setIfStats(false)
      }
    }
  };

  useEffect(() => {
    const lateDate = moment().format("yyyy/MM/DD");
    const nowDate = moment().subtract(1, "days").format("yyyy/MM/DD");

    let nowData = nowDate.split("/").join("-");
    let lateData = lateDate.split("/").join("-");
    setFirstDate(nowData);
    setSecondDate(lateData);
  }, []);
  return (
    <div className="stats">
      <ProfileGeo />
      <h3>Статистика</h3>
      <div className="profile-select">
        <ul>
          <ProfileNavItem href={"/profile/admin"} text={"Админ"} />
          <ProfileNavItem href={"/profile/admin/products"} text={"Продукты"} />
          <ProfileNavItem href={"/profile/admin/stats"} text={"Статистика"} />
        </ul>
      </div>
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
      <button onClick={getStatsList} className="stats-filter_button">
        Показать
      </button>
      <div className="stats-orders_main">
        <h2>Статистика заказов</h2>
        <p style={{ color: "#828282", margin: "10px" }}>
          {nowShowDate} - {lateShowDate}
        </p>
        {ifStats ? (
          <table>
            <tr className="main-title">
              <td className="first-box_table">
                <b>Продукт</b>
              </td>
              <td className="second-box_table">
                <b>Количество</b>
              </td>
              <td className="thierd-box_table">
                <b>Сумма</b>
              </td>
            </tr>
            {statsList.products.map((stat) => (
              <tr key={stat.id}>
                <td className="first-box_table">
                  <b>{stat.productName}</b>
                </td>
                <td className="second-box_table">{stat.quantity}</td>
                <td className="thierd-box_table">{stat.priceSum}</td>
              </tr>
            ))}
            <tr>
              <td className="first-box_table">
                <b>Итого</b>
              </td>
              <td className="second-box_table"></td>
              <td className="thierd-box_table">{statsList.totalSum}</td>
            </tr>
          </table>
        ) : (
          <p style={{color: "#828282", marginLeft: "10px" }}>
            Заказов нет...
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Stats;
