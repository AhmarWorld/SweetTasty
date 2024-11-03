import "./ProviderOrder.css";

export default function ProviderOrder({
  order,
  isCompleted,
  orderNumber,
  isPaid,
}) {
  return (
    <div className="orders-item">
      <h3>{orderNumber}</h3>
      <h5 style={{color:isCompleted ? "#53c95a" : "#828282"}} >{isCompleted ? "Завершен" : "Не завершен"}</h5>
      <h5 style={{color:isPaid ? "#53c95a" : "#828282"}}>{isPaid ? "Оплачен" : "Не оплачен"}</h5>
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
