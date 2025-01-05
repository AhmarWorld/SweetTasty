import "./AdminProduct.css";

export default function AdminProduct({ item }) {
  return (
    <div className="admin_product">
      <img
        className="admin_product-img"
        src={process.env.NEXT_PUBLIC_SERVER_URL + item.image}
      />
      <div className="admin_product-name">{item.name}</div>
      <div className="admin_product-price">{item.price}</div>
    </div>
  );
}
