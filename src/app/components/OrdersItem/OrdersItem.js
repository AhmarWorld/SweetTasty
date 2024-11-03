import "./OrdersItem.css";

function OrdersItem({order,address,orderNumber,cafeName,}) {
  return (
    <div className="orders-item">
      <h3>{orderNumber}</h3>
      <h5>{cafeName}</h5>
      <h5>{address}</h5>
      <div className="oreders-main">
        <ul>
          {order.products.map((product)=>(
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
