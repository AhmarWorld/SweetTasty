import "./OrdersItem.css";

function OrdersItem({
  order,
  address,
  orderNumber,
  cafeName,
  setReviewModalList,
  setOrderReview,
  reviewList,
}) {

  return (
    <div className="orders-item">
      <div className="orders-item-header">
        <h3>{orderNumber}</h3>
        <button
          className={`review-button ${order.reviewed ? "disabled" : ""}`}
          style={{ backgroundColor: "coral" }}
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
