import "./DailyCard.css";
import { AiOutlinePlus } from "react-icons/ai";

function DailyCard() {
  return (
    <div className="daily-card">
      <img
        src="https://arbuz.kz/image/s3/arbuz-kz-products/20096-001.jpg?w=360&h=360&_c=1703608947"
        alt=";/"
      />
      <div className="daily-card_title">
        <h4>Сметана President 15% 400г</h4>
        <p>Сметана изготавливается из высококачественных свежих...</p>
        <div className="price">
          <span>1 550 ₸</span>
          <span className="price-sell">3 550 ₸</span>
          <AiOutlinePlus size={16} color='black' />
        </div>
      </div>
    </div>
  );
}

export default DailyCard;
