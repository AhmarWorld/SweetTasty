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
  const isProductReviewed = (productId) => {
    return reviewList?.includes(Number(productId));
  };

  return (
    <div className="orders-item">
      <div className="orders-item-header">
        <h3>{orderNumber}</h3>
        <button
          // className={`review-button ${
          //   isProductReviewed(order.products[0].id) ? "disabled" : ""
          // }`}
          className={`review-button ${
            false ? "disabled" : ""
          }`}
          onClick={() => {
            if (!isProductReviewed(order.products[0].id)) {
              setOrderReview(order);
              setReviewModalList(true);
            }
          }}
          disabled={isProductReviewed(order.products[0].id)}
        >
          {isProductReviewed(order.products[0].id)
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
