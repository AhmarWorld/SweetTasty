import "./OrdersItem.css";
import moment from "moment";

function OrdersItem({
  order,
  address,
  orderNumber,
  cafeName,
  setReviewModalList,
  setOrderReview,
}) {

  return (
    <div className="orders-item">
      <div className="orders-item-header">
        <h3>{orderNumber}</h3>
        <button
          className={`review-button ${order.reviewed ? "disabled" : ""}`}
          onClick={() => {
            if (!order.reviewed) {
              setOrderReview(order);
              setReviewModalList(true);
            }
          }}
          disabled={order.reviewed}
        >
          {order.reviewed
            ? "Отзыв оставлен"
            : "Оставить отзыв"}
        </button>
      </div>
      <h5>{cafeName}</h5>
      <h5>{address}</h5>
      <h5 style={{ color: "#000" }}>Заказ на {moment(order.createdAt).add(1, "days").format("DD.MM.yyyy")}</h5>
      <div className="oreders-main">
        <ul>
          {order.products.map((product) => (
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

export default OrdersItem;
