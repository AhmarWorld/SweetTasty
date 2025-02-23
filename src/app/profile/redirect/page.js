import Footer from "@/app/components/Footer/Footer";
import "./redirect.css";
import OrdersBunner from "@/app/components/OrdersBunner/OrdersBunner";
import Link from "next/link";

export default function Redirect() {
  return (
    <div className="cart-offer_result">
      <OrdersBunner />
      <h1 className="offer-result_text">Регистрация прошла успешно!</h1>
      <p className="offer-result_text">
        Идет проверка и подтверждение аккаунта! <br/>
        Обратитесь в службу поддержки <br/>
        <Link href={"/profile/auth"}>Авторизация</Link>
      </p>
      <Footer />
    </div>
  );
}
