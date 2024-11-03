import Link from "next/link";
import "./OrdersBunner.css";

export default function OrdersBunner() {
  return (
    <div className="orders-bunners">
      <div style={{ width: "10%" }}></div>
      <Link href={'/profile/main/orders'} className="bunner-title">
        Оставьте отзыв
        <br />
        на ваши заказы
      </Link>
      <button>Оставить</button>
    </div>
  );
}
