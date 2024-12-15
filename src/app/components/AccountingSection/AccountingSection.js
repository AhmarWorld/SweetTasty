"use client";

import { useState } from "react";
import "./AccountingSection.css";
import { RiArrowUpWideFill } from "react-icons/ri";
import moment from "moment";

export default function AccountingSection({ orderInfo }) {
  const [moreInfoOn, setMoreInfoOn] = useState(false);
  return (
    <div className="accounting-section">
      <div className="accountion-top">
        <span style={{ fontWeight: 700 }}>
          Заказ на {moment(orderInfo.createdAt).add('1 d').format("DD/MM/YYYY")}
        </span>
        <br/>
        <div className="acc-top_head">
          <h2>Общая информация</h2>
        </div>
        <table>
          <tr style={{ background: "#E2E3E5" }}>
            <td>
              <b>№</b>
            </td>
            <td>
              <b>Тип заказа</b>
            </td>
            <td>
              <b>Сумма</b>
            </td>
          </tr>
          <tr>
            <td>
              <b>1</b>
            </td>
            <td>{orderInfo.status === "main" ? "Основной заказ" : "Доп заказ"}</td>
            <td>{orderInfo.totalPrice}</td>
          </tr>
          <tr>
            <td>
              <b>2</b>
            </td>
            <td>Доставка</td>
            <td>{orderInfo.deliveryPrice}</td>
          </tr>
          <tr>
            <td></td>
            <td>Итого за день</td>
            <td>{orderInfo.totalPrice}</td>
          </tr>
        </table>
      </div>
      <div className="accountion-bottom">
        <div
          className="acc-bottom_head"
          style={{
            borderRadius: moreInfoOn ? "0px 0px 0px 0px" : "0px 0px 8px 8px",
          }}
          onClick={() => { setMoreInfoOn(!moreInfoOn) }}
        >
          <h2>Детальная информация</h2>
          <RiArrowUpWideFill
            style={
              moreInfoOn
                ? { animation: "arrow", rotate: "180deg" }
                : { rotate: "0deg" }
            }
            className="arrow-anim"
            size={20}
          />
        </div>
        <table style={{ display: moreInfoOn ? "block" : "none" }}>
          <tr style={{ background: "#E2E3E5" }}>
            <td>
              <b>Продукт</b>
            </td>
            <td>
              <b>Цена</b>
            </td>
            <td>
              <b>Кол-во</b>
            </td>
            <td>
              <b>Сумма</b>
            </td>
          </tr>
          {orderInfo.items.map((item) => (
            <tr>
              <td>{item.productName} ({orderInfo.status === "main" ? "Основной заказ" : "Доп заказ"})</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{+item.price * +item.quantity}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
