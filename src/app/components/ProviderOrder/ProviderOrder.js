import "./ProviderOrder.css";
import moment from "moment/moment";

export default function ProviderOrder({
  order,
  isCompleted,
  orderNumber,
  isPaid,
}) {
  return (
    <div className="orders-item">
      <h3>{orderNumber}</h3>
      <h5 style={{color: "#828282"}}>Заказ на {moment(order.createdAt).add(1, "days").format("DD.MM.yyyy")}</h5>
      <div className="oreders-main">
        <ul>
          {order.map((product) => (
            <li key={product.id}>
              <p>{product.productName}</p>
              <div>
                <span>{product.price} ₸</span>
                <span>{product.quantity} шт</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
