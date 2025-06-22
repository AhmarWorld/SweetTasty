import Link from "next/link";
import "./HotOffers.css";

export default function HotOffers() {
  return (
    <div className="hotoffers">
      <div className="hotoffers-main">
        <div
            className="hotoffers-img"
            onClick={() => {
              const element = document.getElementById("sales");
              if (element) {
                const yOffset = -100; // adjust as needed
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}
        >
          <img src="/static/discounts.svg" />
          <p>Скидки</p>
        </div>
        <Link href={'https://wa.me/+77785056357'} className="hotoffers-img">
          <img src="/static/messages.svg" />
          <p>Сообщения</p>
        </Link>
      </div>
    </div>
  );
}