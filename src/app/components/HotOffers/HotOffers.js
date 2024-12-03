import Link from "next/link";
import "./HotOffers.css";

export default function HotOffers() {
  return (
    <div className="hotoffers">
      <div className="hotoffers-main">
        <Link href={'/catalog/search?sales=sales'} className="hotoffers-img">
          <img src="/static/discounts.svg" />
          <p>Скидки</p>
        </Link>
        <Link href={'/messages'} className="hotoffers-img">
          <img src="/static/messages.svg" />
          <p>Сообщения</p>
        </Link>
      </div>
    </div>
  );
}