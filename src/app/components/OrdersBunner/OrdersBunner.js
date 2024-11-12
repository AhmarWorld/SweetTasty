import Link from "next/link";
import "./OrdersBunner.css";

export default function OrdersBunner() {
  return (
    <Link href={"/profile/main/orders"} className="orders-bunners">
      <div style={{ width: "10%" }}></div>
      <div className="bunner-title">
        <p>Оставьте отзыв</p>
        <p>на ваши заказы</p>
      </div>
      <div className="orders-bunner_button">
        <p>Оставить</p>
      </div>
    </Link>
  );
}
