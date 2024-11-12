import Footer from "@/app/components/Footer/Footer";
import "./result.css";
import OrdersBunner from "@/app/components/OrdersBunner/OrdersBunner";
import Link from "next/link";

export default function Result() {
  return (
    <div className="cart-offer_result">
      <OrdersBunner />
      <h1 className="offer-result_text">Заказ успешно оформлен!</h1>
      <p className="offer-result_text">
        Наша команда взялась за ваш заказ! Привезем вам завтра...{" "}
        <Link href={"/profile/main/orders"}>Мои заказы</Link>
      </p>
      <Footer />
    </div>
  );
}
