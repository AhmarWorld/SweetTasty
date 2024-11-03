import Footer from "@/app/components/Footer/Footer";
import "./result.css";
import OrdersBunner from "@/app/components/OrdersBunner/OrdersBunner";

export default function Result() {
  return (
    <div className="cart-offer_result">
      <OrdersBunner />
      <h1 className="offer-result_text">Заказ успешно оформлен!</h1>
      <Footer />
    </div>
  );
}
