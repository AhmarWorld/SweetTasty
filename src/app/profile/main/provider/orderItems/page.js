"use client";
import { useEffect, useState } from "react";
import { MdContentCopy, MdCheck } from "react-icons/md";
import ProfileNavItem from "@/app/components/ProfileNavItem/ProfileNavItem";
import ProfileGeo from "@/app/components/ProfileGeo/ProfileGeo";
import Footer from "@/app/components/Footer/Footer";
import "./OrderItems.css";

function getTomorrowDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

function formatDateRu(dateStr) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  return `${d}.${m}.${y}`;
}

export default function OrderItems() {
  const [clientToken, setClientToken] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [productsList, setProductsList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isProvider, setIsProvider] = useState(false);

  useEffect(() => {
    (async function () {
      if (typeof window != "undefined") {
        const newData = JSON.parse(localStorage.getItem("user-SattyTatty"));
        if (newData) {
          setIsProvider(newData?.accountType === "provider");
        } else {
          router.push("/profile/auth/redirect");
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClientToken(localStorage.getItem("token-SattyTatty") || "");
    }
  }, []);

  const fetchProducts = async () => {
    if (!selectedDate) return;
    setLoading(true);
    setProductsList(null);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URL + "/providers/orders/products",
        {
          method: "POST",
          headers: {
            "ngrok-skip-browser-warning": "any",
            Authorization: "Bearer " + clientToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ date: selectedDate + " 00:00" }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        alert("Ошибка при получении данных");
      } else {
        setProductsList(data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!productsList?.length) return;
    const lines = [
      `Позиции из заявки на ${formatDateRu(selectedDate)}:`,
      ...productsList.map(
        (item, i) => `${i + 1}. ${item.productName} — ${item.quantity} шт.`,
      ),
    ];
    navigator.clipboard.writeText(lines.join("\n")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="order-items-page">
      <ProfileGeo />
      <h3>Заявка</h3>
      <div className="profile-select">
        <ul>
          <ProfileNavItem href={"/profile/main"} text={"Профиль"} />
          <ProfileNavItem
            href={"/profile/main/provider/orders"}
            text={"Заказы"}
          />
          {isProvider && (
            <ProfileNavItem
              href={"/profile/main/provider/orderItems"}
              text={"Заявка"}
            />
          )}
          {!isProvider && (
            <ProfileNavItem
              href={"/profile/main/accounting"}
              text={"Бухгалтерия"}
            />
          )}
        </ul>
      </div>

      <div className="oi-card">
        <h2>Позиции из заявки</h2>

        <div className="oi-field">
          <span className="oi-field-label">Выберите дату поставки</span>
          <p className="oi-field-hint">На какой день заказали еду</p>
          <div className="oi-input-row">
            <input
              type="date"
              value={selectedDate}
              max={getTomorrowDate()}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setProductsList(null);
              }}
              className="oi-date-input"
            />
            <button
              onClick={fetchProducts}
              disabled={!selectedDate || loading}
              className="oi-btn"
            >
              {loading && <span className="oi-spinner" />}
              {loading ? "Загрузка..." : "Получить заявку"}
            </button>
          </div>
        </div>

        {productsList !== null && (
          <div className="oi-result">
            <div className="oi-result-header">
              <span className="oi-result-title">
                {productsList.length > 0
                  ? `${productsList.length} позиц${productsList.length === 1 ? "ия" : productsList.length < 5 ? "ии" : "ий"} · ${formatDateRu(selectedDate)}`
                  : `${formatDateRu(selectedDate)}`}
              </span>
              {productsList.length > 0 && (
                <button
                  onClick={handleCopy}
                  className={`oi-copy-btn${copied ? " copied" : ""}`}
                >
                  {copied ? <MdCheck size={15} /> : <MdContentCopy size={15} />}
                  {copied ? "Скопировано" : "Скопировать"}
                </button>
              )}
            </div>

            {productsList.length === 0 ? (
              <p className="oi-empty">Заказов за этот день не найдено</p>
            ) : (
              <table className="oi-table">
                <thead>
                  <tr>
                    <th className="td-num">#</th>
                    <th>Наименование</th>
                    <th>Кол-во</th>
                  </tr>
                </thead>
                <tbody>
                  {productsList.map((item, i) => (
                    <tr key={item.productId}>
                      <td className="td-num">{i + 1}</td>
                      <td>{item.productName}</td>
                      <td className="td-qty">{item.quantity} шт.</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
