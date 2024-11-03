import Link from "next/link";
import "./OrdersBunner.css";

export default function OrdersBunner() {
  return (
    <Link href={"/profile/main/orders"} className="orders-bunners">
      <div style={{ width: "10%" }}></div>
      <div className="bunner-title">
        Оставьте отзыв
        <br />
        на ваши заказы
      </div>
      <div className="button">Оставить</div>
    </Link>
  );
}
